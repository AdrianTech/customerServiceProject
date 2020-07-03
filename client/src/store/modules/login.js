import axios from "axios";
import router from "../../router/index";

const state = {
  user: null,
  info: {
    bool: false,
    msg: "",
    status: 0
  },
  isLogged: false,
  dataLoaded: false
};

const getters = {
  eventInfo: state => state.info,
  userData: state => state.user,
  isLogged: state => state.isLogged,
  dataLoaded: state => state.dataLoaded
};

const mutations = {
  userResponse: (state, payload) => (state.user = payload),
  dataLoaded: (state, payload) => (state.dataLoaded = payload),
  errUserResponse: (state, obj) => {
    state.info = {
      bool: true,
      msg: obj.msg,
      status: obj.status
    };
    setTimeout(() => {
      state.info = {
        bool: false,
        message: "",
        status: 0
      };
    }, 3000);
  },
  isLogged: (state, payload) => (state.isLogged = payload),
  clearUser: (state, payload) => (state.user = payload)
};
const actions = {
  errHandler({ commit }, data) {
    commit("errUserResponse", data);
  },
  async loginUser({ commit, dispatch }, data) {
    try {
      const res = await axios.post("/login", data);
      [
        ["userResponse", res.data],
        ["isLogged", true]
      ].forEach(i => commit(i[0], i[1]));
      ["getClients", "getServices"].forEach(i => dispatch(i));
    } catch (err) {
      const error = {
        msg: err.response.data,
        status: 400
      };
      dispatch("errHandler", error);
      commit("isLogged", false);
    }
  },

  logoutUser({ commit, dispatch }) {
    try {
      axios.get("/logout");
      [
        ["clearUser", null],
        ["isLogged", false]
      ].forEach(i => commit(i[0], i[1]));
      dispatch("resetClientsArray");
      dispatch("errHandler", { msg: "You've been logged out", status: 200 });
      if (router.history.current.path !== "/") router.push("/");
    } catch (err) {
      const error = {
        msg: err.response.data,
        status: 400
      };
      dispatch("errHandler", error);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
