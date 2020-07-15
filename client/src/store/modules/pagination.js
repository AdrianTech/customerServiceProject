const state = {
  page: 1,
  servicePage: 1,
  serviceLastPage: 1,
  serviceStart: 0,
  servicesData: [],
  serviceMeta: {},
};

const getters = {
  page: ({ page }) => page,
  serviceMeta: ({ serviceMeta }) => serviceMeta,
  current: ({ servicePage }) => servicePage,
  servicesData: ({ servicesData }) => servicesData,
};

const mutations = {
  handlePage: (state, { name, getters }) => {
    const { meta } = getters;
    if (name === "increment" || state.page < 1) state.page++;
    if (name === "decrement" || state.page > meta.last_page) state.page--;
    if (name === "lastPage") state.page = meta.last_page;
    if (name === "start") state.page = 1;
  },
  serviceHandler(state, method) {
    const { services } = this.state.services;
    const { serviceMeta } = state;
    if (method === "increment" || state.servicePage < 1) state.servicePage++;
    if (method === "decrement" || state.servicePage > serviceMeta.lastServicePage) {
      state.servicePage--;
    }
    if (method === "lastPage") state.servicePage = serviceMeta.lastServicePage;
    if (method === "start") state.servicePage = 1;
    const start = state.servicePage * 6 - 6 || 0;
    const end = state.servicePage * 6;
    const lastServicePage = Math.ceil(services.length / 6);
    state.servicesData = services.slice(start, end);
    state.serviceMeta = {
      start,
      end,
      lastServicePage,
    };
  },
};
const actions = {
  servicePaginationHandler({ commit }, method) {
    commit("serviceHandler", method);
  },
  pagination({ commit, dispatch, getters }, name) {
    const { meta } = getters;
    commit("handlePage", { name, getters });
    if (state.page > 0 && state.page <= meta.last_page) dispatch("getClients");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
