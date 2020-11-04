<template>
  <div class="inside">
    <form @submit.prevent="submitData" class="form">
      <label>Your Email</label>
      <input type="email" v-model.trim="email" />
      <label>Login name</label>
      <input type="text" v-model="loginname" />
      <label>Change role</label>
      <select v-model="role">
        <option :disabled="role === 'admin'" value="admin">Admin</option>
        <option :disabled="role === 'maintainer'" value="maintainer">Maintainer</option>
        <option :disabled="role === 'visitor'" value="visitor">Visitor</option>
      </select>
      <button class="modal-btn">Confirm</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { userValidation } from "../../../shared/validate";
import isEqual from "lodash.isequal";
export default {
  name: "UserUpdateModal",
  props: ["user"],
  data() {
    const { email, role, loginname, id } = this.user;
    return {
      email,
      role,
      loginname,
      id
    };
  },
  methods: {
    ...mapActions(["errHandler", "updateUserByAdmin"]),
    async submitData() {
      const compare = isEqual(this.user, this.$data);
      if (compare)
        return this.errHandler({ msg: "Nothing changed", status: 400 });
      const { err, status } = await userValidation(this.$data);
      if (!status) return this.errHandler({ msg: err[0], status: 400 });
      this.updateUserByAdmin(this.$data);
    }
  }
};
</script>

<style lang="scss" scoped>
.inside {
  @include inside(100%, 100%);
}
select,
option {
  font-weight: 700;
  font-size: 15px;
  font-family: $openSans;
}
select {
  margin-top: 10px;
  border-radius: 5px;
  color: darkred;
  padding: 5px;
  option {
    color: $dark-blue;
  }
}
@media (min-width: 768px) {
  .inside {
    @include inside(50%, 80%);
  }
}
</style>
