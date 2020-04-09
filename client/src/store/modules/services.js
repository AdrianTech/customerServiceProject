import axios from "axios";

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
      commit("serviceData", res.data);
    } catch (err) {
      console.log(err.response);
    }
  },
  async getServices({ commit }) {
    try {
      const res = await axios.get("/getServices");
      commit("serviceData", res.data);
    } catch (err) {
      console.log(err);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
