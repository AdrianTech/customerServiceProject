<template>
  <form class="form" @submit.prevent="create" novalidate>
    <h3>Add new user to your team</h3>
    <label>User name</label>
    <input type="text" v-model.trim="loginname" />
    <label>User email</label>
    <input type="email" v-model.trim="email" />
    <div style="marginTop: 10px">
      <input type="checkbox" v-model="sendEmail" />
      <label>Send an email to {{loginname}}?</label>
    </div>
    <select v-model="role">
      <option disabled value>Select role</option>
      <option value="admin">Admin</option>
      <option value="maintainer">Maintainer</option>
      <option value="visitor">Visitor</option>
    </select>
    <button type="submit">Create</button>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import { userValidation } from "../../../shared/validate.js";
import { clearData } from "../../../shared/sharedFunctions";
export default {
  name: "Form",
  data() {
    return {
      loginname: "",
      email: "",
      sendEmail: false,
      role: ""
    };
  },
  methods: {
    ...mapActions(["createUser", "errHandler"]),
    async createHandler() {
      const resolve = await this.createUser(this.$data);
      if (resolve) {
        this.errHandler({ msg: "Added new member", status: 200 });
        clearData(this.$data);
      }
    },
    async create() {
      const { err, status } = await userValidation(this.$data);
      status
        ? this.createHandler()
        : this.errHandler({ msg: err[0], status: 400 });
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  max-width: 500px;
  margin: 12px auto;
  text-align: left;
  padding: 10px 35px;
  input {
    border-radius: 0;
  }
  select {
    margin: 13px 0;
    width: 40%;
  }
  button {
    @include primary-btn;
    background-color: #038f0a;
    font-size: 17px;
    margin: 12px auto;
    padding: 0 30px;
    &:hover {
      background-color: transparent;
    }
  }
  h3 {
    font-size: 18px;
    text-align: center;
    color: $secondary;
  }
}
@media (min-width: 500px) {
  .form {
    border: 1px solid rgba(0, 0, 0, 0.25);
  }
}
@media (min-width: 768px) {
  .form button {
    padding: 0 40px;
  }
}
</style>