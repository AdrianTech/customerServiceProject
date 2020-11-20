<template>
  <div class="setPassword">
    <h3>Hello, {{ name }}. Set your password</h3>
    <form class="form" @submit.prevent="submit">
      <label>Type password</label>
      <input type="password" v-model.trim="password" />
      <label>Repeat password</label>
      <input type="password" v-model="repeatedPassword" />
      <button>Set password and log in</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "SetPassword",
  data() {
    return {
      password: "",
      repeatedPassword: ""
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    name() {
      return this.$route.query.name;
    },
    token() {
      return this.$route.query.token;
    }
  },
  methods: {
    ...mapActions(["errHandler"]),
    async submit() {
      const { password, repeatedPassword, errHandler, id, token } = this;
      if (!password || password.length < 8 || password.length > 25)
        return errHandler({
          msg: "Password must have at least 8 characters but no more than 25",
          status: 400
        });
      else if (password !== repeatedPassword)
        return errHandler({
          msg: "First password and second password must be the same",
          status: 400
        });
      try {
        await axios.post("/users/set_password", { password, id, token });
        errHandler({
          msg: "Password has been added correctly. Now, just log in",
          status: 200
        });
        setTimeout(() => {
          this.$router.push("/");
        }, 1500);
      } catch (e) {
        errHandler({ msg: e.response.data });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.setPassword {
  padding-top: $topPadding;
  font-family: $openSans;
  h3 {
    text-align: center;
  }
  input {
    border-radius: 0;
  }
}
button {
  @include primary-btn;
  margin-top: 20px;
}
@media (min-width: 500px) {
  form {
    max-width: 500px;
    margin: auto;
  }
}
</style>
