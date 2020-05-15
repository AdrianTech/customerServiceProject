<template>
  <div class="item-list" v-if="service">
    <h3>
      Service name:
      <span>{{ name }}</span>
    </h3>
    <h4>
      Unit price:
      <span>{{ unitPrice }}</span>
    </h4>
    <h4>
      Created:
      <span>{{ created() }}</span>
    </h4>
    <h4>
      Default months:
      <span>{{ months }}</span>
    </h4>
    <div class="actions">
      <button @click="openModal(update)">Update</button>
      <button @click="removeService">Remove</button>
    </div>
    <button class="addService" @click="openModal(create)">
      <span>+</span>
    </button>
    <Modal v-if="createOpen" :modalID="create">
      <CreateNewService />
    </Modal>
    <Modal v-if="updateOpen" :modalID="update">
      <UpdateService :service="service" />
    </Modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";
import CreateNewService from "../services/CreateNewService";
import UpdateService from "../services/UpdateService";
import Modal from "../events/Modal";
import { findObj } from "../../shared/sharedFunctions.js";
export default {
  name: "ServicesList",
  props: ["service"],
  data() {
    return {
      update: 1231321321545,
      create: 32142423424324
    };
  },
  components: { CreateNewService, Modal, UpdateService },
  computed: {
    ...mapGetters(["services", "modals"]),
    id() {
      return this.service._id;
    },
    name() {
      return this.service.name;
    },
    unitPrice() {
      return this.service.unitPrice;
    },
    months() {
      return this.service.months;
    },
    modalID() {
      return this.modals.servicesManage.id;
    },
    open() {
      return this.modals.servicesManage.open;
    },
    createOpen() {
      return findObj(this.modals, this.create);
    },
    updateOpen() {
      return findObj(this.modals, this.update);
    }
  },
  methods: {
    ...mapActions(["openModal", "deleteService"]),
    created() {
      const { createdDate } = this.service;
      const guess = moment.tz.guess();
      return moment(createdDate)
        .clone()
        .tz(guess)
        .format("LLL");
    },
    removeService() {
      const confirm = window.confirm(`Remove ${this.name}`);
      if (confirm) this.deleteService(this.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.item-list {
  @include item-list;
  flex-direction: column;
  border: 1px solid $db-light;
}
h3 span,
h4 span {
  color: #030fc0;
  font-weight: 700;
  margin-left: 15px;
}
.actions {
  padding: 5px;
  button {
    background-color: #fff;
    padding: 2px 7px;
    font-size: 14px;
    border-width: 1px;
    margin: 0 7px;
    border-radius: 5px;
    &:first-child {
      border-color: green;
      color: green;
    }
    &:nth-child(2) {
      border-color: red;
      color: red;
    }
  }
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
  .item-list > * {
    font-size: 18px;
  }
}
@media (min-width: 1000px) {
}
</style>
