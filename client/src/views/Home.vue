<template>
  <div class="welcome-page">
    <Login v-if="!isLogged" />
    <template v-else>
      <h1>Welcome back!</h1>
      <h3>This app offer you a bunch of features:</h3>
      <h4>You may add your client and manage him</h4>
      <h4>You may add selected service to client account</h4>
      <h4>You'll see when the services of a given customer end</h4>
      <h4>And this application will inform you about it</h4>
      <router-link to="/clients-list">
        <button>Get started</button>
      </router-link>
      <router-link to="/settings">
        <button>Check your settings</button>
      </router-link>
    </template>
  </div>
</template>

<script>
import Login from "../components/Login";
import { mapGetters } from "vuex";
import { admin } from "../shared/variables";
export default {
  components: {
    Login,
  },
  data() {
    return {
      admin,
    };
  },
  computed: {
    ...mapGetters(["isLogged", "userData"]),
  },
  name: "Home",
};
</script>

<style lang="scss" scoped>
.welcome-page {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: $topPadding 15px 10px;
  height: 100%;
  button {
    @include primary-btn;
    margin-top: 20px;
  }
  h1 {
    text-align: center;
    margin-bottom: 10px;
  }
  h3 {
    margin-bottom: 14px;
  }
  h4 {
    margin: 10px 0;
  }
}
@media (min-width: 768px) {
  .welcome-page h4 {
    font-size: 20px;
  }
}
</style>
