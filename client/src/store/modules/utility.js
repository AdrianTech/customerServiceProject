const state = {
  isOpen: false,
  double: false
};

const getters = {
  isOpen: ({ isOpen }) => isOpen,
  double: ({ double }) => double
};

const mutations = {
  modalClose: (state, payload) => (state.isOpen = payload),
  modalDouble: (state, payload) => (state.double = payload)
};
const actions = {
  openModal({ commit }, bool) {
    if (bool === "double") return commit("modalDouble", !state.double);
    return commit("modalClose", bool);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
