<template>
  <div class="wrapper">
    <h2>You have {{services.length === 1 ? `${services.length} service` :`${services.length} services`}}</h2>
    <div class="services">
      <ServicesList v-for="service in servicesData" :key="service._id" :service="service" />
    </div>
    <Pagination :meta="meta" :type="'service'" />
    <button class="btn-add" @click="openModal(create)">
      <img src="../assets/add.png" alt="add button" />
    </button>
    <Modal v-if="createOpen" :modalID="create">
      <CreateNewService />
    </Modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ServicesList from "../components/services/ServicesList";
import Pagination from "../shared/pagination";
import Modal from "../components/events/Modal";
import CreateNewService from "../components/services/CreateNewService";
import { findObj } from "../shared/sharedFunctions.js";
export default {
  name: "Services",
  data() {
    return {
      create: 32142423424324
    };
  },
  components: { ServicesList, Pagination, Modal, CreateNewService },
  computed: {
    ...mapGetters(["services", "meta", "modals", "servicesData"]),
    createOpen() {
      return findObj(this.modals, this.create);
    }
  },
  methods: {
    ...mapActions(["openModal"])
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  @include pt;
  text-align: center;
  h2 {
    margin-bottom: 8px;
  }
}
.services {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
  grid-gap: 5px;
}
@media (min-width: 500px) {
  .services {
    grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
  }
}
@media (min-width: 768px) {
  .services {
    grid-gap: 12px;
  }
}
@media (min-width: 1000px) {
}
</style>