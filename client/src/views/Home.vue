<template>
  <div class="login-page">
    <Login v-if="!userLoginState" />
    <h1 v-else>Welcome to this project</h1>
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
    ...mapGetters(["userLoginState"])
  },
  name: "Home"
};
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  h1 {
    text-align: center;
  }
}
</style>