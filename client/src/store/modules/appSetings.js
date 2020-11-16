import axios from "axios";
const state = {};

const getters = {};

const mutations = {};
const actions = {
  async switcher({ dispatch }, settings) {
    const { route, data } = settings;
    try {
      const res = await axios.post(route, data);
    } catch (e) {
      dispatch("errHandler", { msg: "Something went wrong. Try again", status: 400 });
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
