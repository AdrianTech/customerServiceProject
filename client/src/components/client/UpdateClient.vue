<template>
  <div class="inside">
    <form>
      <label @click="showInput('fullname')">
        Change full name -
        <span>{{data.fullname}}</span>
      </label>
      <input type="text" v-model.trim="fullname" v-if="obj.fullname" placeholder="change fullname" />
      <label data-name="email" @click="showInput('email')">
        Change email -
        <span>{{data.email}}</span>
      </label>
      <input type="text" v-model.trim="email" v-if="obj.email" placeholder="change email" />
      <label data-name="phone" @click="showInput('phone')">
        Change phone number -
        <span>{{data.phone}}</span>
      </label>
      <input type="text" v-model.trim="phone" v-if="obj.phone" placeholder="change phone number" />
      <button @click.prevent="confirm" class="modal-btn">Confirm changes</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { updateDataValid } from "../../shared/validation";
export default {
  name: "UpdateClient",
  props: ["data", "update"],
  data() {
    return {
      fullname: "",
      phone: "",
      email: "",
      obj: {
        fullname: false,
        phone: false,
        email: false
      }
    };
  },
  // computed: {
  //   ...mapGetters([""])
  // },
  methods: {
    ...mapActions(["errHandler"]),
    showInput(name) {
      if (name === "fullname") this.obj.fullname = !this.obj.fullname;
      if (name === "phone") this.obj.phone = !this.obj.phone;
      if (name === "email") this.obj.email = !this.obj.email;
    },
    closeWindowFunc(e) {
      const target = e.target.classList[0];
      if (target === "modalWindow" || target === "close") this.$emit("update");
    },
    confirm() {
      const { fullname, email, phone } = this;
      const data = {
        fullname,
        email,
        phone
      };
      const { msg, bool, value } = updateDataValid(data);
      if (!bool) return this.errHandler({ msg, status: 400 });
      console.log(value);
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
    cursor: pointer;
    z-index: 1;
    &:hover {
      text-decoration: underline;
    }
    span {
      color: #09f109;
    }
  }
  label,
  input {
    margin: 10px;
    font-size: 17px;
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
}
@media (min-width: 1000px) {
  .inside {
    @include inside(50%, 75%);
    margin: 0 auto;
  }
}
</style>