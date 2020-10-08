<template>
  <div class="client-list">
    <div class="desc-list">
      <span>Counter</span>
      <span class="fullname">Client name</span>
      <span>Actions</span>
    </div>
    <Client v-bind="client" v-for="(client, index) in clientData" :key="client._id" :index="index" />
    <Pagination :meta="meta" :pagination="getClients" />
    <button class="btn-add" @click="addNewClient">
      <img src="../assets/add.png" alt="add button" />
    </button>
  </div>
</template>

<script>
import Client from "../components/client/Client";
import Pagination from "../shared/pagination";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Client,
    Pagination
  },
  computed: {
    ...mapGetters(["clientData", "meta"])
  },
  methods: {
    ...mapActions(["pagination", "getClients"]),
    addNewClient() {
      this.$router.push({
        name: "Create Client Account"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.client-list {
  padding: 5px;
}
.desc-list {
  display: flex;
  text-align: center;
  border-bottom: 1px solid #7c7c7c;
  padding-top: 80px;
  padding-bottom: 10px;
  color: $dark-blue;
  font-family: $balFont;
  font-weight: 700;
  span {
    flex: 1;
  }
  .fullname {
    flex: 2;
  }
}
@media (min-width: 768px) {
  .client-list {
    max-width: 968px;
    margin: auto;
    font-size: 21px;
  }
}
</style>
