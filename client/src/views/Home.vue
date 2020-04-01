<template>
  <div class="welcome-page">
    <Login v-if="!isLogged" />
    <template v-else>
      <h1>Welcome to this project</h1>
      <router-link to="/show-client-list">Show me client List</router-link>
      <h3>OR</h3>
      <router-link to="/create-service">Create a new service</router-link>
    </template>
  </div>
</template>

<script>
import Login from "../components/Login";
import { mapGetters } from "vuex";
export default {
  components: {
    Login
  },
  computed: {
    ...mapGetters(["isLogged"])
  },
  name: "Home"
};
</script>

<style lang="scss" scoped>
.welcome-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  h1 {
    text-align: center;
    margin-bottom: 12px;
  }
  h3 {
    margin: 14px 0;
  }
  a {
    font-size: 18px;
    color: #440101;
    font-weight: 700;
    padding: 10px;
    border: 1px solid #440101;
  }
}
</style>