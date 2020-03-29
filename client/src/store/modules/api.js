import axios from "axios";

const state = {
  clients: []
};

const getters = {
  clientData: state => state.clients
};

const mutations = {
  setClientsData: (state, payload) => (state.clients = payload)
};
const actions = {
  async getClients({ commit }) {
    const res = await axios.get("/getClients");
    commit("setClientsData", res.data);
  },
  resetClientsArray({ commit }) {
    commit("setClientsData", []);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
