import axios from "axios";
const state = {
  searchResult: [],
  searchInfo: "",
  searchOption: null,
};

const getters = {
  searchResult: ({ searchResult }) => searchResult,
  searchInfo: ({ searchInfo }) => searchInfo,
  searchOption: ({ searchOption }) => searchOption,
};

const mutations = {
  setSearchInfo: (state, payload) => (state.searchInfo = payload),
  setSearchOption: (state, payload) => (state.searchOption = payload),
  searchData: (state, payload) => (state.searchResult = payload),
};
const actions = {
  async search({ commit, dispatch }, { searchValue, option }) {
    try {
      const res = await axios.get(`/search/?value=${searchValue}&option=${option}`);
      commit("setSearchOption", option);
      commit("searchData", res.data);
      commit("setSearchInfo", 200);
    } catch (err) {
      commit("setSearchInfo", err.response.data);
      commit("setSearchOption", null);
      dispatch("errHandler", { msg: err.response.data, status: 400 });
    }
  },
  searchClear({ commit }) {
    [
      { func: "searchData", value: [] },
      { func: "setSearchOption", value: null },
    ].forEach((i) => commit(i.func, i.value));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
