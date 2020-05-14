<template>
  <div class="inside">
    <form>
      <label @click="showInput(formData[0].key)">
        Change full name:
        <span>[{{ data.fullname }}]</span>
      </label>
      <input type="text" @change="formDataHelper" v-model.trim="fullname" v-if="formData[0].active" placeholder="change fullname" />
      <label data-name="email" @click="showInput(formData[1].key)">
        Change email:
        <span>[{{ data.email }}]</span>
      </label>
      <input type="text" v-model.trim="email" @change="formDataHelper" v-if="formData[1].active" placeholder="change email" />
      <label data-name="phone" @click="showInput(formData[2].key)">
        Change phone number:
        <span>[{{ data.phone }}]</span>
      </label>
      <input type="text" v-model.trim="phone" @change="formDataHelper" v-if="formData[2].active" placeholder="change phone number" />
      <button @click.prevent="confirm" class="modal-btn">Confirm changes</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { validateUpdateClient } from "../../shared/validate";
import { clientUpdate } from "../../shared/formData";
import clone from "lodash.clonedeep";
export default {
  name: "UpdateClient",
  props: ["data"],
  data() {
    return {
      formData: clone(clientUpdate),
      finalData: {}
    };
  },
  computed: {
    fullname: {
      get() {
        return this.formData[0].value.fullname;
      },
      set(value) {
        return (this.formData[0].value.fullname = value);
      }
    },
    email: {
      get() {
        return this.formData[1].value.email;
      },
      set(value) {
        return (this.formData[1].value.email = value);
      }
    },
    phone: {
      get() {
        return this.formData[2].value.phone;
      },
      set(value) {
        return (this.formData[2].value.phone = value);
      }
    }
  },
  methods: {
    ...mapActions(["errHandler", "updateClient"]),
    async confirm() {
      let { finalData, errHandler } = this;
      const isEmpty = Object.keys(finalData).length === 0 && finalData.constructor === Object;
      if (isEmpty) return errHandler({ msg: "Nothing changed", status: 400 });
      const { status, err } = await validateUpdateClient(finalData);
      if (!status) return errHandler({ msg: err[0], status: 400 });
      finalData.id = this.data._id;
      const updated = await this.updateClient(finalData);
      if (updated) {
        this.formData = clone(clientUpdate);
        this.finalData = {};
      }
    },
    showInput(key) {
      const { formData } = this;
      formData.forEach(i => (key === i.key ? (i.active = !i.active) : i));
      this.formDataHelper();
    },
    formDataHelper() {
      let { formData } = this;
      let val = {};
      formData.filter(({ active, value }) => active && Object.assign(val, value));
      this.finalData = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.inside {
  @include inside(100%, 100%);
}
.close {
  position: absolute;
  top: 2%;
  right: 2%;
  font-size: 30px;
  cursor: pointer;
}
.inside {
  @include inside(100%, 100%);
  .btn {
    width: 70%;
    margin: 10px auto;
  }
}
form {
  @include form;
  label {
    font-weight: 700;
    span {
      color: #d8d805;
      margin-left: 7px;
    }
    cursor: pointer;
    z-index: 1;
    &:hover {
      text-decoration: underline;
    }
  }
  label,
  input {
    margin: 10px;
    font-size: 16px;
  }
  input {
    padding: 3px 10px;
    border-radius: 5px;
    margin: 10px auto;
  }
  .btn {
    margin-top: 15px;
  }
}
@media (min-width: 500px) {
  .inside {
    @include inside(85%, 75%);
    margin: 0 auto;
  }
}
@media (min-width: 700px) {
  .inside {
    @include inside(60%, 70%);
  }
  form input {
    width: 50%;
  }
  form label {
    font-size: 19px;
  }
}
@media (min-width: 1000px) {
  .inside {
    @include inside(50%, 75%);
    margin: 0 auto;
  }
}
</style>
