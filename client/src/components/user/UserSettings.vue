<template>
  <section class="settings-area">
    <div class="userSettings">
      <h4>{{ name }}, update one or many fields</h4>
      <div class="showData">
        <table @change="isUpdateData">
          <tr>
            <th>Name</th>
            <td>
              <input type="text" v-model.trim="user.loginname" :placeholder="name" />
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td>
              <input
                type="email"
                v-model.trim="user.email"
                :placeholder="user_email"
                autocomplete="new-email"
              />
            </td>
          </tr>
          <tr>
            <th>New Password</th>
            <td>
              <input
                type="password"
                v-model.trim="user.password"
                placeholder="New password here..."
                autocomplete="new-password"
              />
            </td>
          </tr>
          <tr>
            <th>Repeat password</th>
            <td>
              <input
                type="password"
                v-model.trim="user.repeatPass"
                placeholder="Repeat password..."
                :disabled="!user.password"
              />
            </td>
          </tr>
        </table>
        <button @click="update">Update</button>
      </div>
    </div>
    <ApplicationSettings v-if="role === admin" />
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { validateUpdateUser } from "../../shared/validate";
import { clearData } from "../../shared/sharedFunctions";
import ApplicationSettings from "./users_mgmt/ApplicationSettings";
import { admin } from "../../shared/variables";
export default {
  name: "UserSettings",
  components: { ApplicationSettings },
  data() {
    return {
      admin,
      user: {
        email: "",
        password: "",
        loginname: "",
        repeatPass: ""
      },
      isActive: false,
      updated_data: {}
    };
  },
  computed: {
    ...mapGetters(["userData", "meta"]),
    name() {
      return this.userData.loginname;
    },
    user_email() {
      return this.userData.email;
    },
    role() {
      return this.userData.role;
    }
  },
  methods: {
    ...mapActions(["changeUserData", "errHandler"]),
    isUpdateData() {
      const { user } = this.$data;
      const val = Object.entries(user).filter(
        ([key, val]) => val !== "" && user[key]
      );
      if (val.length > 0) this.isActive = true;
      else this.isActive = false;
      this.updated_data = Object.fromEntries(val);
    },
    async update() {
      const { updated_data, errHandler, userData } = this;
      if (!this.isActive)
        return errHandler({ msg: "Nothing changed", status: 400 });
      let data = updated_data;
      if (Object.prototype.hasOwnProperty.call(data, "password")) {
        if (data.password !== data.repeatPass)
          return errHandler({
            msg: "Passwords must be the same ",
            status: 400
          });
      }
      delete data.repeatPass;
      const valid = await validateUpdateUser(data);
      if (!valid.status) return errHandler({ msg: valid.err[0], status: 400 });
      data.id = userData._id;
      if (await this.changeUserData(data))
        errHandler({ msg: "Your data has been changed", status: 200 });
      this.updated_data = {};
      this.isActive = false;
      clearData(this.$data.user);
    }
  }
};
</script>

<style lang="scss" scoped>
.userSettings {
  padding-top: $topPadding;
  text-align: center;
  font-family: $openSans;
  color: $dark-blue;
}
button {
  @include primary-btn;
  display: block;
  padding: 5px 25px;
  margin: 20px auto;
}
input {
  border: none;
  height: 100%;
  outline: none;
  font-weight: 700;
  color: #2b0101;
  font-size: 17px;
  font-family: $openSans;
  text-align: center;
  font-size: 17px;
  &::placeholder {
    color: #666565;
    font-family: $openSans;
    font-size: 14px;
    font-weight: 700;
  }
  &:disabled {
    opacity: 0.3;
    background-color: transparent;
  }
}
.showData {
  text-align: center;
  width: 100%;
  margin-top: 40px;
  padding: 0 10px;
}
table {
  border-radius: 5px;
  border-collapse: collapse;
  width: 100%;
}
td,
th {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 5px;
  height: 50px;
  text-align: center;
}
th {
  padding: 5px 10px;
  font-size: 15px;
}
@media (min-width: 500px) {
  .showData {
    width: 70%;
    margin: 40px auto;
  }
}
@media (min-width: 768px) {
  .showData {
    width: 45%;
  }
  h4 {
    font-size: 20px;
  }
  th {
    font-size: 18px;
  }
  input::placeholder {
    font-size: 16px;
  }
}
</style>
