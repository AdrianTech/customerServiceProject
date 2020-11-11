<template>
  <section class="analytics">
    <Statistics :clients="clients" />
    <Charts :clients="clients" />
  </section>
</template>

<script>
import Charts from "./Charts";
import { mapGetters, mapActions } from "vuex";
import Statistics from "./Statistics";
import axios from "axios";
export default {
  name: "Analitycs",
  components: { Charts, Statistics },
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
