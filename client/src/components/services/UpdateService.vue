<template>
  <form class="inside" @submit.prevent="submitData" novalidate>
    <h3>Update service data</h3>
    <div class="itemList">
      <label @click="displayInput('name')">
        Change name
        <span>[{{name}}]</span>
      </label>
      <input
        type="text"
        v-model.trim="clickedObj[0].value.name"
        @change="test"
        v-if="clickedObj[0].state"
      />
    </div>
    <div class="itemList">
      <label @click="displayInput('unitPrice')" for>
        Change unit price
        <span>[{{ unitPrice }}]</span>
      </label>
      <input
        v-model.number.trim="clickedObj[1].value.unitPrice"
        @change="test"
        v-if="clickedObj[1].state"
      />
    </div>
    <div class="itemList">
      <label @click="displayInput('months')" for>
        Set default months
        <span>[{{months}}]</span>
      </label>
      <input
        type="number"
        v-model.number.trim="clickedObj[2].value.months"
        @change="test"
        v-if="clickedObj[2].state"
      />
    </div>
    <button class="modal-btn">Confirm changes</button>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import { validateUpdateServices } from "../../shared/validate.js";
export default {
  name: "UpdateService",
  props: ["service"],
  data() {
    const { _id } = this.service;
    return {
      id: _id,
      clickedObj: [
        { nameItem: "name", state: false, value: { name: "" } },
        { nameItem: "unitPrice", state: false, value: { unitPrice: 0.0 } },
        { nameItem: "months", state: false, value: { months: 0 } }
      ],
      data: {}
    };
  },
  computed: {
    name() {
      return this.service.name;
    },
    months() {
      return this.service.months;
    },
    unitPrice() {
      return this.service.unitPrice;
    }
  },
  methods: {
    ...mapActions(["updateService", "errHandler"]),
    async submitData() {
      let { data, errHandler, id, updateService, clickedObj } = this;
      const isEmpty =
        Object.keys(data).length === 0 && data.constructor === Object;
      if (isEmpty) return errHandler({ msg: "Nothing changed", status: 400 });
      data.id = id;
      const valid = await validateUpdateServices(data);
      if (valid.length > 0) errHandler({ msg: valid[0], status: 400 });
      updateService(data);
      clickedObj[0].value.name = "";
      clickedObj[1].value.unitPrice = 0.0;
      clickedObj[1].value.months = 0;
    },
    displayInput(name) {
      let { clickedObj } = this;
      clickedObj.forEach(i => {
        if (i.nameItem === name) {
          i.state = !i.state;
        }
      });
      this.test();
    },
    test() {
      let { clickedObj } = this;
      let val = {};
      clickedObj.filter(i => i.state && Object.assign(val, i.value));
      this.data = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.inside {
  @include inside(100%, 100%);
  h3 {
    margin-bottom: 20px;
  }
}
.itemList {
  flex-direction: column;
  border-bottom: 1px solid white;
  label {
    cursor: pointer;
    span {
      color: #fcf804;
      margin-left: 7px;
    }
  }
}
input {
  width: 70%;
  margin: 10px auto;
  border-radius: 6px;
  padding: 3px 12px;
  font-weight: 700;
}
@media (min-width: 500px) {
  .inside {
    @include inside(80%, 90%);
    padding: 40px;
  }
}
@media (min-width: 768px) {
  .inside {
    @include inside(60%, 80%);
    padding: 40px;
  }
  input {
    width: 50%;
  }
}
@media (max-width: 500px) {
  .modal-btn {
    width: 70%;
  }
}
</style>
