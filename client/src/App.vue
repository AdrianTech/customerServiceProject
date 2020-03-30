<template>
  <div id="app">
    <Header v-if="userLoginState" />
    <router-view />
  </div>
</template>

<script>
import Header from "../src/components/Header";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Header
  },
  computed: {
    ...mapGetters(["userLoginState"])
  },
  methods: {
    ...mapActions(["getClients", "loginUser"])
  },
  mounted() {
    // this.loginUser()
    // this.getCliets();
    // if (!this.userLoginState) this.$router.push("/");
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul {
  list-style: none;
}
button {
  cursor: pointer;
}
.addService {
  position: fixed;
  bottom: 5%;
  right: 5%;
  width: 40px;
  height: 40px;
  color: aliceblue;
  background-color: #03971c;
  border-radius: 50%;
  border: 1px dashed black;
  span {
    font-size: 20px;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // padding-top: 80px;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
}
a {
  text-decoration: none;
}
@media (min-width: 768px) {
  .addService {
    width: 60px;
    height: 60px;
    span {
      font-size: 30px;
    }
  }
}
</style>
