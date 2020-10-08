<template>
  <div class="wrapper">
    <h2>You have {{services.length === 1 ? `${services.length} service` :`${services.length} services`}}</h2>
    <div class="services">
      <ServicesList
        v-for="service in showServices"
        :allServicesFunc="showAllServices"
        :key="service._id"
        :service="service"
      />
    </div>
    <button v-if="from === search" class="btn-confirm" @click="showAllServices">Show services</button>
    <Pagination
      v-if="from === undefined"
      :meta="serviceMeta"
      :pagination="servicePaginationHandler"
    />
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
import { search } from "../shared/variables";
export default {
  name: "Services",
  data() {
    const { id, from } = this.$route.params;
    return {
      create: 32142423424324,
      showServices: [],
      id,
      from,
      search
    };
  },
  mounted() {
    this.setServicesList();
  },
  watch: {
    servicesData() {
      this.setServicesList();
    }
  },
  components: { ServicesList, Pagination, Modal, CreateNewService },
  computed: {
    ...mapGetters(["services", "modals", "servicesData", "serviceMeta"]),
    createOpen() {
      return findObj(this.modals, this.create);
    }
  },
  methods: {
    ...mapActions(["openModal", "servicePaginationHandler"]),
    setServicesList() {
      this.from !== search
        ? (this.showServices = this.servicesData)
        : (this.showServices = this.services.filter(
            item => item._id === this.id
          ));
    },
    showAllServices() {
      this.from = undefined;
      this.setServicesList();
    }
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
</style>