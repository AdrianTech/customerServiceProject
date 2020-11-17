<template>
  <div class="applicationSettings">
    <Title :name="'Application Settings'" />
    <SwitchToggle
      :data="{nameOn: 'Enable email notifications', nameOff: 'Disable email notifications', state: emailState, method: switcher, route: '/application/settings'}"
      @checkedEvent="checkedEvent"
    />
  </div>
</template>

<script>
import SwitchToggle from "../../../shared/SwitchToggle";
import Title from "../../../shared/Title";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ApplicationSettings",
  components: { SwitchToggle, Title },
  computed: {
    ...mapGetters(["appSettings"]),
    emailState() {
      return this.appSettings.emailNotifications;
    }
  },
  methods: {
    ...mapActions(["switcher"])
    // checkedEvent(val) {
    //   console.log(val);
    // }
  }
};
</script>

<style lang="scss" scoped>
.applicationSettings {
  font-family: $openSans;
  padding: 10px;
  border-top: 1px solid #8f8e8e;
  text-align: center;
  max-width: 600px;
  margin: auto;
}
h3 {
  margin-bottom: 20px;
  font-weight: 700;
  color: #0704ac;
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
}
@media (min-width: 1000px) {
}
</style>