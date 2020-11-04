const state = {
  modals: [],
};

const getters = {
  modals: ({ modals }) => modals,
};

const mutations = {
  modalsHandler: (state, id) => {
    let { modals } = state;
    if (modals.length === 0) modals = [{ id, open: false }];
    if (modals.length > 0) {
      modals.forEach((i) => {
        if (i.id === id) i.open = !i.open;
        if (i.id === id && !i.open) modals = [];
      });
    }
    return (state.modals = modals);
  },
};
const actions = {
  openModal({ commit }, id) {
    commit("modalsHandler", id);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
