<template>
  <div class="client-list">
    <div class="desc-list">
      <span>Counter</span>
      <span class="fullname">Fullname</span>
      <span>Actions</span>
    </div>
    <Client v-bind="client" v-for="client in clientData" :key="client._id"></Client>
  </div>
</template>

<script>
import Client from "../components/Client";
import { mapGetters } from "vuex";
export default {
  components: {
    Client
  },
  computed: {
    ...mapGetters(["clientData"])
  }
};
</script>

<style lang="scss" scoped>
.desc-list {
  display: flex;
  text-align: center;
  border-bottom: 1px solid #7c7c7c;
  padding-top: 80px;
  padding-bottom: 10px;
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
  }
}
</style>
