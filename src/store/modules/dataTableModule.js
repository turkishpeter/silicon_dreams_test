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
  selectedRow: [],
  selectedRowIndex: 0
};

const getters = {
  getTableData: state => {
    return state.tableData;
  },
  getSelectedRow: state => {
    return state.selectedRow;
  },
  getSelectedRowIndex: state => {
    return state.selectedRowIndex;
  }
};

const mutations = {
  selectRowMutation: (state, payload) => {
    state.selectedRow = payload;
  },
  saveEditedRowMutation: (state, payload) => {
    console.log(payload[1].index);
    var newTableData = state.tableData.filter(
      (item, index) => index !== payload[1].index
    );
    state.tableData = [...newTableData, payload[0]];
  },
  createRowMutation: (state, payload) => {
    state.tableData = [...state.tableData, payload];
  },
  selectedRowIndexMutation: (state, payload) => {
    state.selectedRowIndex = payload;
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
  },
  selectedRowIndexAction: ({ commit }, payload) => {
    commit("selectedRowIndexMutation", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
