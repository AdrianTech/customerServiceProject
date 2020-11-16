<template>
  <section class="analytics" v-if="clients.length > 0">
    <Statistics :clients="clients" />
    <Charts :clients="clients" />
  </section>
  <Spinner v-else />
</template>

<script>
import Charts from "./Charts";
import { mapGetters, mapActions } from "vuex";
import Statistics from "./Statistics";
import Spinner from "../../../shared/Spinner";
import axios from "axios";
export default {
  name: "Analitycs",
  components: { Charts, Statistics, Spinner },
  data() {
    return {
      clients: []
    };
  },
  computed: {
    ...mapGetters(["clientData"])
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
