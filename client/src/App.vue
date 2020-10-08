<template>
  <div id="app">
    <Header v-if="isLogged" />
    <router-view />
    <Alert />
  </div>
</template>

<script>
import Header from "../src/components/Header";
import { mapGetters, mapActions } from "vuex";
import Alert from "../src/components/events/Alert";
export default {
  components: {
    Header,
    Alert
  },
  computed: {
    ...mapGetters(["isLogged"])
  },
  methods: {
    ...mapActions(["getClients", "loginUser"])
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
