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
      dispatch("errHandler", { msg: res.data.msg, status: 200 });
    } catch (err) {
      dispatch("errHandler", { msg: err.response.data, status: 400 });
    }
  },
  async addNewServiceToClient({ commit, dispatch }, data) {
    // console.log(data);
    try {
      const res = await axios.post("/clientServiceUpdate", data);
      commit("setClientsData", res.data);
      dispatch("errHandler", { msg: "Service added", status: 200 });
    } catch (err) {
      dispatch("errHandler", { msg: err.reponse.data, status: 400 });
    }
  },
  async createNote({ commit, dispatch }, data) {
    console.log(data);
    if (data.length < 10) return;
    try {
      const res = await axios.post("/createNote", data);
      commit("setClientsData", res.data);
      dispatch("errHandler", { msg: "Service added", status: 200 });
    } catch (err) {
      dispatch("errHandler", { msg: err.reponse.data, status: 400 });
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
