<template>
  <div class="applicationSettings">
    <Title :name="'Application Settings'" />
    <SwitchToggle :data="{ nameOn: 'Enable email notifications', nameOff: 'Disable email notifications', state: emailState }" @checkedEvent="checkedEvent" />
    <Select :options="selectOptions" @selectEvent="selectEvent" :state="currency" />
  </div>
</template>

<script>
import SwitchToggle from "../../../shared/SwitchToggle";
import Select from "../../../shared/Select";
import Title from "../../../shared/Title";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ApplicationSettings",
  components: { SwitchToggle, Title, Select },
  data() {
    return {
      selectOptions: [
        { name: "Dolar", value: "dolar" },
        { name: "Euro", value: "euro" },
        { name: "Zloty", value: "zloty" },
        { name: "UK pound", value: "pound" },
      ],
    };
  },
  computed: {
    ...mapGetters(["appSettings"]),
    emailState() {
      return this.appSettings.emailNotifications;
    },
    currency() {
      return this.appSettings.currency;
    },
  },
  methods: {
    ...mapActions(["settingsHandler", "errHandler"]),
    checkedEvent(val) {
      const settings = {
        route: "/application/settings",
        value: val,
      };
      this.settingsHandler(settings);
    },
    selectEvent(val) {
      const settings = {
        route: "/application/settings/currency",
        value: val,
      };
      const result = this.settingsHandler(settings);
      result && this.errHandler({ msg: val[0].toUpperCase() + val.slice(1) + " is set", status: 200 });
    },
  },
};
</script>

<style lang="scss" scoped>
.applicationSettings {
  font-family: $openSans;
  padding: 10px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 10%;
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
