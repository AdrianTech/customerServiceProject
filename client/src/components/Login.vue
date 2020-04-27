<template>
  <form class="form" @submit.prevent="submitHandler">
    <label for>Your email</label>
    <input type="text" name="email" v-model="email" />
    <label for>Your password</label>
    <input type="password" name="password" v-model="password" />
    <button class="btn-confirm">Log in</button>
    <!-- <Alert /> -->
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { validationLogin } from "@/shared/validation";
// import Alert from "@/components/events/Alert";
export default {
  name: "Login",
  // components: { Alert },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["eventInfo"])
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

<style lang="scss" scoped></style>
<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 60%;
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
    border-radius: 7px;
    border: 1px solid $dark-blue;
  }
}
.btn-confirm {
  max-width: 200px;
  @include primary-btn;
}

@media (min-width: 480px) {
  .form {
    width: 80%;
  }
}
@media (min-width: 768px) {
  .form {
    width: 50%;
    font-size: 18px;
    padding: 50px;
    border: 1px solid $db-light;
  }
}
</style>
