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
  },
  async createClient({ commit, dispatch }, data) {
    console.log(data);
    try {
      const res = await axios.post("/createClient", data);
      commit("setClientsData", res.data.data);
      dispatch("errHandler", res.data.msg);
    } catch (err) {
      dispatch("errHandler", err.response.data);
    }
  },
  async addNewServiceToClient({ commit, dispatch }, data) {
    console.log(data);
    try {
      const res = await axios.post("/clientServiceUpdate", data);
      commit("setClientsData", res.data);
      dispatch("errHandler", "Service added");
    } catch (err) {
      dispatch("errHandler", err.reponse.data);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
