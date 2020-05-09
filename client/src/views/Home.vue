<template>
  <div class="welcome-page">
    <Login v-if="!isLogged" />
    <template v-else>
      <h1>Welcome to this project</h1>
      <router-link to="/services">Services List</router-link>
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
  @include pt;
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
    @include primary-link;
  }
}
</style>
