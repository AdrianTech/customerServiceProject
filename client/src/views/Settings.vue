<template>
  <div class="settings">
    <h2>Hello {{userData.loginname}}</h2>
    <div>
      <router-link class="btn-settings" to="/your-settings">
        <img src="../assets/settings_red.png" alt />
        Your settings
      </router-link>
    </div>
    <div>
      <router-link class="btn-settings" to="/your-settings/create-user">
        <img src="../assets/add.png" alt />Add new user
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Settings",
  computed: {
    ...mapGetters(["userData"])
  }
};
</script>

<style lang="scss" scoped>
.settings,
.btn-settings {
  display: flex;
  color: $dark-blue;
  align-items: center;
}
.btn-settings {
  @include primary-link;
  img {
    width: 30px;
    margin-right: 12px;
  }
}
.settings {
  flex-direction: column;
  margin-bottom: 20px;
  padding-top: 80px;
  text-align: center;
  > * {
    margin: 10px 0;
  }
}
@media (min-width: 500px) {
  .btn-settings {
    transform: scale(1.15);
  }
}
@media (min-width: 1000px) {
}
</style>