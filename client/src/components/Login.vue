<template>
  <form class="form" @submit.prevent="submitHandler">
    <label for>Your email</label>
    <input type="text" name="email" v-model="email" />
    <label for>Your password</label>
    <input type="password" name="password" v-model="password" autocomplete="on" />
    <button class="btn-confirm">Log in</button>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import { validationLogin } from "@/shared/validation";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["loginUser", "errHandler"]),
    submitHandler() {
      const { email, password } = this;
      const data = {
        email,
        password
      };
      const { msg, bool } = validationLogin(data);
      if (!bool) return this.errHandler(msg);
      this.loginUser(data);
    }
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 480px) {
  .form {
    padding: 30px;
    box-shadow: 0 0px 5px rgba(10, 1, 99, 0.5);
  }
}
@media (min-width: 768px) {
  .form {
    padding: 75px;
  }
}
</style>
<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  font-size: 17px;
  padding: 15px;
  > * {
    @include balFont;
  }
  h3 {
    color: #c40404;
  }
  label,
  button {
    margin: 10px;
  }
  input {
    padding: 7px;
    font-size: 19px;
    border: none;
    border-bottom: 2px solid $dark-blue;
  }
}
.btn-confirm {
  max-width: 200px;
  @include primary-btn;
  margin-top: 25px !important;
}
@media (min-width: 480px) {
  .form {
    font-size: 18px;
    border-radius: 7px;
    label {
      font-size: 22px;
    }
  }
}
</style>
