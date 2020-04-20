import axios from "axios";
import router from "../../router/index";

const state = {
  user: null,
  info: {
    bool: false,
    msg: "",
    status: 0
  },
  isLogged: false
};

const getters = {
  eventInfo: state => state.info,
  userData: state => state.user,
  isLogged: state => state.isLogged
};

const mutations = {
  userResponse: (state, payload) => (state.user = payload),
  errUserResponse: (state, obj) => {
    console.log(obj);
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
      const res = await axios.post("/loginUser", data);
      commit("userResponse", res.data);
      commit("isLogged", true);
      dispatch("getClients");
      dispatch("getServices");
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
      commit("clearUser", null);
      commit("isLogged", false);
      dispatch("resetClientsArray");
      if (router.history.current.path !== "/") router.push("/");
    } catch (err) {
      console.log(err.response);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
