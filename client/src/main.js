import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import DisableAutocomplete from "vue-disable-autocomplete";

Vue.use(DisableAutocomplete);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
