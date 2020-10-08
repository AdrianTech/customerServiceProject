<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/clients-list">Client List</router-link>
        </li>
        <li>
          <router-link to="/services-list">Services</router-link>
        </li>
        <li>
          <router-link to="/search-page">
            <span class="material-icons search-icon">search</span>
          </router-link>
        </li>
        <button class="logout" v-if="isLogged" @click="logout">
          <svg
            width="120"
            height="117"
            viewBox="0 0 120 117"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M86.4077 11.0763C85.0499 13.466 85.8942 16.4834 88.1205 18.0953C100.165 26.8162 108 40.9931 108 57C108 83.5097 86.5097 105 60 105C33.4903 105 12 83.5097 12 57C12 40.8454 19.9805 26.5547 32.2141 17.8553C34.4938 16.2341 35.3518 13.149 33.9365 10.7361L32.9332 9.02564C31.5503 6.66814 28.5164 5.84095 26.2577 7.37987C10.4076 18.1791 0 36.3741 0 57C0 90.1371 26.8629 117 60 117C93.1371 117 120 90.1371 120 57C120 36.5432 109.762 18.4775 94.131 7.64694C91.8524 6.06814 88.7691 6.92048 87.3996 9.3307L86.4077 11.0763Z"
              fill="none"
            />
            <line x1="60" x2="60" y2="60" stroke="black" stroke-width="12" />
          </svg>
        </button>
      </ul>
    </nav>
  </header>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapGetters(["isLogged"])
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
.search-icon {
  margin-top: 5px;
}
header {
  width: 100%;
  background-color: $dark-blue;
  height: 60px;
  top: 0;
  position: fixed;
  z-index: 50;
  font-family: "Baloo Thambi 2", sans-serif;
  .logout {
    svg {
      width: 100%;
      height: 100%;
      path {
        fill: #f73b3b;
      }
      line {
        stroke: #f73b3b;
      }
    }
    padding: 0;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border: none;
  }
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
    font-weight: bold;
    font-size: 14px;

    &.router-link-exact-active {
      color: #eef863;
    }
  }
}
@media (min-width: 500px) {
  nav ul a {
    font-size: 17px;
  }
}
@media (min-width: 768px) {
  nav ul a {
    font-size: 21px;
  }
  header .logout {
    width: 25px;
  }
}
</style>