const state = {
  modals: {
    updateClient: {
      id: 1,
      open: false
    },
    addClientService: {
      id: 2,
      open: false
    },
    servicesList: {
      id: 3,
      open: false
    },
    showEmail: {
      id: 4,
      open: false
    },
    sendEmail: {
      id: 5,
      open: false
    },
    servicesManage: {
      id: 6,
      open: false
    },
    updateService: {
      id: 7,
      open: false
    }
  }
};

const getters = {
  modals: ({ modals }) => modals
};

const mutations = {
  modalClose: (state, payload) => (state.modals = payload)
};
const actions = {
  openModal({ commit }, id) {
    const { modals } = state;
    console.log(id);
    Object.entries(modals).forEach(([key, obj]) => {
      key;
      if (obj.id === id) obj.open = !obj.open;
    });
    commit("modalClose", state.modals);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
