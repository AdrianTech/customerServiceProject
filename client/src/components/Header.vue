<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/show-client-list">Client List</router-link>
        </li>
        <!-- <li>
          <router-link to="/create-client">Create account</router-link>
        </li>-->
        <li>
          <router-link to="/settings">Settings</router-link>
        </li>
        <button v-if="userLoginState" @click="logout">Logout</button>
      </ul>
    </nav>
  </header>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapGetters(["userLoginState"])
  },
  methods: {
    ...mapActions(["logoutUser"]),
    logout() {
      this.logoutUser();
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  background-color: #2e5cf3;
  height: 60px;
  top: 0;
  position: fixed;
  z-index: 50;
}
nav {
  height: 100%;
  ul {
    display: flex;
    height: 100%;
    justify-content: space-evenly;
    align-items: center;
  }
  a {
    color: aliceblue;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;
    font-size: 14px;

    &.router-link-exact-active {
      color: #d80556;
    }
  }
}
@media (min-width: 500px) {
  nav ul a {
    font-size: 15px;
  }
}
@media (min-width: 768px) {
  nav ul a {
    font-size: 17px;
  }
}
</style>