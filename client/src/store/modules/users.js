import axios from "axios";
import router from "../../router/index";
import { emailValidation } from "../../shared/validate";
const state = {
  user: null,
  info: {
    bool: false,
    msg: "",
    status: 0,
  },
  users: [],
  isLogged: false,
  dataLoading: false,
};

const getters = {
  eventInfo: (state) => state.info,
  userData: (state) => state.user,
  isLogged: (state) => state.isLogged,
  dataLoading: ({ dataLoading }) => dataLoading,
  users: ({ users }) => users,
};

const mutations = {
  usersMutation: (state, payload) => (state.users = payload),
  userResponse: (state, payload) => (state.user = payload),
  dataLoading: (state, payload) => (state.dataLoading = payload),
  errUserResponse: (state, obj) => {
    state.info = {
      bool: true,
      msg: obj.msg,
      status: obj.status,
    };
    setTimeout(() => {
      state.info = {
        bool: false,
        message: "",
        status: 0,
      };
    }, 3000);
  },
  isLogged: (state, payload) => (state.isLogged = payload),
  clearUser: (state, payload) => (state.user = payload),
};
const actions = {
  errHandler({ commit }, data) {
    commit("errUserResponse", data);
  },
  async loginUser({ commit, dispatch }, data) {
    commit("dataLoading", true);
    try {
      const res = await axios.post("/login", data);
      [
        ["userResponse", res.data],
        ["isLogged", true],
        ["dataLoading", false],
      ].forEach((i) => commit(i[0], i[1]));
      ["getClients", "getServices", "getSettings"].forEach((i) => dispatch(i));
    } catch (err) {
      const error = {
        msg: err.response.data,
        status: 400,
      };
      dispatch("errHandler", error);
      commit("isLogged", false);
      commit("dataLoading", false);
    }
  },

  logoutUser({ commit, dispatch }) {
    try {
      axios.get("/logout");
      [
        ["clearUser", null],
        ["isLogged", false],
        ["searchData", []],
        ["serviceData", []],
        ["usersMutation", []],
      ].forEach((i) => commit(i[0], i[1]));
      dispatch("resetClientsArray");
      dispatch("errHandler", { msg: "You've been logged out", status: 200 });
      if (router.history.current.path !== "/") router.push("/");
    } catch (err) {
      const error = {
        msg: err.response.data,
        status: 400,
      };
      dispatch("errHandler", { msg: error, status: 400 });
    }
  },
  async changeUserData({ commit, dispatch }, data) {
    try {
      const res = await axios.post("/users", data);
      commit("userResponse", res.data);
      return true;
    } catch (err) {
      dispatch("errHandler", { msg: "Something went wrong. Try again.", status: 400 });
      return false;
    }
  },
  async getUsers({ commit, dispatch }) {
    try {
      const res = await axios.get("/users");
      commit("usersMutation", res.data);
      return true;
    } catch (err) {
      dispatch("errHandler", { msg: "Something went wrong. Try again.", status: 400 });
      return false;
    }
  },
  async createUser({ commit, dispatch }, data) {
    try {
      const res = await axios.post("/users/create", data);
      commit("usersMutation", res.data);
      return true;
    } catch (e) {
      dispatch("errHandler", { msg: e.response.data, status: 400 });
      return false;
    }
  },
  async removeUser({ commit, dispatch }, id) {
    try {
      const res = await axios.delete(`/users?id=${id}`);
      commit("usersMutation", res.data);
      dispatch("errHandler", { msg: "User deleted", status: 200 });
    } catch (e) {
      dispatch("errHandler", { msg: e.response.data, status: 400 });
    }
  },
  async updateUserByAdmin({ commit, dispatch }, data) {
    try {
      const res = await axios.post(`/users/update`, data);
      commit("usersMutation", res.data);
      dispatch("errHandler", { msg: "User updated", status: 200 });
    } catch (e) {
      dispatch("errHandler", { msg: e.response.data, status: 400 });
    }
  },
  async forgotPassword({ commit, dispatch }, email) {
    const { err, status } = await emailValidation(email);
    !status && dispatch("errHandler", { msg: err[0], status: 400 });
    if (!status) return dispatch("errHandler", { msg: err[0], status: 400 });
    try {
      const res = await axios.post(`/users/forgot_password`, email);
      dispatch("errHandler", { msg: "Message sent. Check your email", status: 200 });
    } catch (e) {
      dispatch("errHandler", { msg: e.response.data, status: 400 });
    }
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
