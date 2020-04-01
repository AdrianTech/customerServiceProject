<template>
  <form class="form" @submit.prevent="submitHandler">
    <label for>Your email</label>
    <input type="text" name="email" v-model="email" />
    <label for>Your password</label>
    <input type="password" name="password" v-model="password" />
    <button class="btn-confirm">Log in</button>
    <h3 v-if="eventInfo.bool">{{ eventInfo.message }}</h3>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { validationLogin } from "@/shared/validation";
export default {
  name: "Login",
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
  width: 100%;
  padding: 15px;
  h3 {
    color: #c40404;
  }
  label,
  button {
    margin: 10px;
  }
  input {
    padding: 7px;
    font-size: 17px;
  }
}
.btn-confirm {
  max-width: 200px;
  border: 1px solid #062e06;
  padding: 5px 18px;
  color: yellow;
  font-size: 17px;
  background-color: green;
  border-radius: 8px;
  transition: 0.3s ease-in;
  outline: none;
  &:focus:hover {
    background-color: white;
    color: #062e06;
  }
}

@media (min-width: 480px) {
  .form {
    width: 80%;
  }
}
@media (min-width: 768px) {
  .form {
    width: 50%;
  }
}
</style>
