<template>
  <section class="analytics">
    <Statistics :clients="clients" />
    <Charts :clients="clients" />
  </section>
</template>

<script>
import Charts from "./Charts";
import { mapGetters, mapActions } from "vuex";
// import { filterClientsByTime } from "../../../shared/helpers";
import Statistics from "./Statistics";
import axios from "axios";
export default {
  components: { Charts, Statistics },
  data() {
    return {
      clients: []
    };
  },
  computed: {
    ...mapGetters(["clientData"])
    // series() {
    //   return [
    //     {
    //       data: filterClientsByTime(this.clients, this.setDays),
    //       name: "clients"
    //     }
    //   ];
    // }
    // totalNumberOfServices() {
    //   return this.clients.reduce(
    //     (acc, { typeOfService }) => acc + typeOfService.length,
    //     0
    //   );
    // }
  },
  mounted() {
    this.getClients();
  },
  methods: {
    async getClients() {
      const res = await axios.get("/users/clients");
      this.clients = res.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.analytics {
  padding-top: $topPadding;
  font-family: $openSans;
}
</style>
