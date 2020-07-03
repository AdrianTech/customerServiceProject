<template>
  <div class="wrapper">
    <h2>You have {{services.length === 1 ? `${services.length} service` :`${services.length} services`}}</h2>
    <div class="services">
      <ServicesList v-for="service in servicesData" :key="service._id" :service="service" />
    </div>
    <Pagination :meta="meta" :type="'service'" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ServicesList from "../components/services/ServicesList";
import Pagination from "../shared/pagination";
export default {
  name: "Services",
  components: { ServicesList, Pagination },
  computed: {
    ...mapGetters(["services", "meta", "servicesData"])
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