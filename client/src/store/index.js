import Vue from "vue";
import Vuex from "vuex";
import clients from "./modules/clients";
import login from "./modules/login";
import services from "./modules/services";
import modals from "./modules/modals";
import pagination from "./modules/pagination";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    clients,
    login,
    services,
    modals,
    pagination
  }
});
