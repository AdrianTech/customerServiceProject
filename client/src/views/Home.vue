<template>
  <div class="welcome-page">
    <Login v-if="!isLogged" />
    <template v-else>
      <h1>Welcome, {{userData.loginname}}</h1>
      <div class="introduction">
        <h3>Main functions of the app:</h3>
        <ul>
          <li>Add new client and manage his services</li>
          <li>Send an email to the client</li>
          <li>Write a note about your client</li>
          <li>Add services and manage them</li>
          <li>Receive notifications about your client's service status</li>
          <li>Analitycs, Statistics and more...</li>
        </ul>
      </div>
      <router-link to="/clients-list">
        <button>Get started</button>
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
    Login
  },
  data() {
    return {
      admin
    };
  },
  computed: {
    ...mapGetters(["isLogged", "userData"])
  },
  name: "Home"
};
</script>

<style lang="scss" scoped>
.welcome-page {
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: $openSans;
  padding: $topPadding 15px 10px;
  height: 100%;
  button {
    @include primary-btn;
  }
  h1 {
    text-align: center;
    margin-bottom: 10px;
  }
  .introduction {
    margin-top: 20px;
    h3 {
      padding: 3px;
      border-bottom: 1px solid #0000004b;
    }
  }
  ul {
    margin: 15px 20px;
    width: auto;
    color: #0415ac;
    font-weight: 700;
    list-style: square;
    li {
      padding: 5px;
      &:nth-child(odd) {
        color: #010a3f;
      }
    }
  }
}
@media (min-width: 520px) {
  .welcome-page h3 {
    font-size: 20px;
  }
  .welcome-page ul {
    li {
      font-size: 19px;
    }
  }
}
</style>
