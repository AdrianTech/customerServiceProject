import axios from "axios";

// import axios from "axios";

const state = {
  services: []
};

const getters = {
  services: state => state.services
};

const mutations = {
  serviceData: (state, payload) => (state.services = payload)
};
const actions = {
  async createService({ commit }, data) {
    try {
      const res = await axios.post("/createService", data);
      console.log(res);
    } catch (err) {
      console.log(err.response);
    }
    commit("serviceData", data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
