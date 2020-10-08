import axios from "axios";

const state = {
  services: [],
};

const getters = {
  services: (state) => state.services,
};

const mutations = {
  serviceData: (state, payload) => (state.services = payload),
};
const actions = {
  async createService({ commit, dispatch }, data) {
    const { servicePage } = this.state.pagination;
    try {
      const res = await axios.post("/createService", data);
      commit("serviceData", res.data);
      commit("serviceHandler", servicePage);
      dispatch("errHandler", { msg: "Service added", status: 200 });
    } catch ({ response }) {
      dispatch("errHandler", { msg: response.data, status: 400 });
    }
  },
  async getServices({ commit, dispatch }) {
    try {
      const res = await axios.get("/services");
      commit("serviceData", res.data);
      commit("serviceHandler", 1);
    } catch (err) {
      dispatch("errHandler", { msg: "Error, try again", status: 400 });
    }
  },
  async deleteService({ commit, dispatch }, id) {
    const { servicePage } = this.state.pagination;
    try {
      const res = await axios.delete("/removeService", { params: { id } });
      commit("serviceData", res.data);
      commit("serviceHandler", servicePage);
      dispatch("errHandler", { msg: "Service deleted", status: 200 });
    } catch (err) {
      dispatch("errHandler", { msg: "Error, try again", status: 400 });
    }
  },
  async updateService({ commit, dispatch }, data) {
    const { servicePage } = this.state.pagination;
    try {
      const res = await axios.put("/updateService", data);
      commit("serviceData", res.data);
      dispatch("errHandler", { msg: "Service updated", status: 200 });
      commit("serviceHandler", servicePage);
    } catch (err) {
      dispatch("errHandler", { msg: "Error, try again", status: 400 });
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
