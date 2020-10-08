const state = {
  servicePage: 1,
  servicesData: [],
  serviceMeta: {},
};

const getters = {
  serviceMeta: ({ serviceMeta }) => serviceMeta,
  currentServicePage: ({ servicePage }) => servicePage,
  servicesData: ({ servicesData }) => servicesData,
};

const mutations = {
  serviceHandler: function(state, value) {
    const { services } = this.state.services;
    let currentPage = value != null ? value : 1;
    const start = currentPage * 6 - 6 || 0;
    const end = currentPage * 6;
    const last_page = Math.ceil(services.length / 6);
    state.servicesData = services.slice(start, end);
    state.servicePage = currentPage;
    state.serviceMeta = {
      next_page: currentPage !== last_page ? currentPage + 1 : currentPage,
      prev_page: currentPage > 1 ? currentPage - 1 : currentPage,
      isNextPage: currentPage === last_page ? false : true,
      isPreviousPage: currentPage === 1 ? false : true,
      current_page: currentPage,
      last_page,
    };
  },
};
const actions = {
  servicePaginationHandler({ commit }, value) {
    commit("serviceHandler", value);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
