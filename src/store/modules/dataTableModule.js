const state = {
  tableData: [
    {
      name: "Nagy Géza",
      type: "szállító",
      partnership: "belföld",
      payment_type: "online",
      bank_account: "4444-4444-4444-4444"
    },
    {
      name: "Kiss Anna Bella",
      type: "vevő",
      partnership: "eu",
      payment_type: "money",
      bank_account: "2222-2222-2222-2222"
    }
  ],
  selectedRow: []
};

const getters = {
  getTableData: state => {
    return state.tableData;
  },
  getSelectedRow: state => {
    return state.selectedRow;
  }
};

const mutations = {
  selectRowMutation: (state, payload) => {
    state.selectedRow = payload;
  },
  saveEditedRowMutation: (state, payload) => {
    state.tableData = [...state.tableData, payload];
  },
  createRowMutation: (state, payload) => {
    state.tableData = [...state.tableData, payload];
  }
};

const actions = {
  selectRowAction: ({ commit }, payload) => {
    commit("selectRowMutation", payload);
  },
  saveEditedRowAction: ({ commit }, payload) => {
    commit("saveEditedRowMutation", payload);
  },
  createRowAction: ({ commit }, payload) => {
    commit("createRowMutation", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
