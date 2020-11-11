<template>
  <div class="wrapper">
    <form v-if="!showForgotPassword" class="form">
      <label for>Your email</label>
      <input type="text" name="email" v-model="email" />
      <label for>Your password</label>
      <input type="password" name="password" v-model="password" autocomplete="on" />
      <button @click.prevent="submitHandler" class="btn-confirm">Log in</button>
      <button
        class="btn-forgot"
        @click.prevent="showForgotPassword = !showForgotPassword"
      >Forgot password?</button>
    </form>
    <form v-if="showForgotPassword" class="form">
      <label>Verify your email</label>
      <input type="text" v-model.trim="forgotEmail" placeholder="Type your email..." />
      <button @click.prevent="forgotPassword({email:forgotEmail})" class="btn-confirm">Send</button>
      <button
        class="btn-forgot"
        @click.prevent="showForgotPassword = !showForgotPassword"
      >Back to login form</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { loginValidation } from "../shared/validate";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      showForgotPassword: false,
      forgotEmail: ""
    };
  },
  methods: {
    ...mapActions(["loginUser", "errHandler", "forgotPassword"]),
    async submitHandler() {
      const { email, password } = this;
      const data = {
        email,
        password
      };
      const { err, status } = await loginValidation(data);
      if (!status) return this.errHandler({ msg: err[0], status: 400 });
      this.loginUser(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.form input {
  border-radius: 0;
}
.btn-forgot {
  background-color: transparent;
  color: #1402b3;
  border: none;
  font-size: 15px;
  outline: none;
}
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
    padding: 4px 7px;
    font-size: 19px;
    border: none;
    border-radius: 5px;
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
    input {
      padding: 7px;
    }
  }
}
</style>
