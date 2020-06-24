const state = {
  page: 1
};

const getters = {
  page: ({ page }) => page
};

const mutations = {
  handlePage: (state, { name, getters }) => {
    const { meta } = getters;
    if (name === "increment" || state.page < 1) state.page++;
    if (name === "decrement" || state.page > meta.last_page) state.page--;
    if (name === "lastPage") state.page = meta.last_page;
    if (name === "start") state.page = "1";
  }
};
const actions = {
  pagination({ commit, dispatch, getters }, name) {
    const { meta } = getters;
    commit("handlePage", { name, getters });
    if (state.page > 0 && state.page <= meta.last_page) dispatch("getClients");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
