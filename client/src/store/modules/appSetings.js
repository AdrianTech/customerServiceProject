import axios from "axios";
const state = {
  appSettings: {},
};

const getters = {
  appSettings: ({ appSettings }) => appSettings,
};

const mutations = {
  updateSettings: (state, payload) => (state.appSettings = payload),
};
const actions = {
  async settingsHandler({ commit, dispatch }, settings) {
    const { route, value } = settings;
    const data = {
      value,
      id: state.appSettings.id,
    };
    try {
      const res = await axios.post(route, data);
      commit("updateSettings", res.data);
      return true;
    } catch (e) {
      dispatch("errHandler", { msg: "Something went wrong. Try again", status: 400 });
      return false;
    }
  },
  async getSettings({ commit, dispatch }) {
    try {
      const res = await axios.get("/application/settings");
      commit("updateSettings", res.data);
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
