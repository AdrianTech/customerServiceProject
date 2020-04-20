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
  async createService({ commit, dispatch }, data) {
    try {
      const res = await axios.post("/createService", data);
      commit("serviceData", res.data);
      dispatch("errHandler", { msg: "Service added", status: 200 });
    } catch ({ response }) {
      dispatch("errHandler", { msg: response.data, status: 200 });
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
