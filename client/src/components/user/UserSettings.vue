<template>
  <div class="userSettings">
    <h3>Hello!</h3>
    <h2>{{userData.email}}</h2>
    <h4>You have {{clientData.length}}{{clientData.length > 1 ? " clients" : " client"}}</h4>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "UserSettings",
  computed: {
    ...mapGetters(["userData", "clientData"])
  },
  methods: {
    ...mapActions([""])
  }
};
</script>

<style lang="scss" scoped>
.userSettings {
  padding-top: $topPadding;
  text-align: center;
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
}
@media (min-width: 1000px) {
}
</style>