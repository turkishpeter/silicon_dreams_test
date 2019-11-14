<template>
  <div class="container-fluid">
    <!-- <th>Név</th>
    <th>Típus</th>
    <th>Tagság</th>
    <th>Fizetési mód</th>
    <th>Bankszámlaszám</th>-->
    <div class="row" style="overflow: hidden">
      <ag-grid-vue
        style="width: 100%; height: 500px;"
        class="ag-theme-material"
        :columnDefs="columnDefs"
        :rowData="rowData"
        :modules="modules"
        :gridOptions="gridOptions"
      ></ag-grid-vue>
    </div>

    <div class="row">
      <button class="button" @click="createData()">Új partner</button>
    </div>
    <app-modal v-if="formOpen" @formWasClosed="formOpen = $event" />
  </div>
</template>

<script>
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-material.css";
import { AgGridVue } from "@ag-grid-community/vue";
import { AllCommunityModules } from "@ag-grid-community/all-modules";
import Modal from "./Modal";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      formOpen: false,
      table: "",
      columnDefs: [
        {
          headerName: "Név",
          field: "name",
          sortable: true
        },
        { headerName: "Típus", field: "type", sortable: true },
        { headerName: "Tagság", field: "partnership", sortable: true },
        { headerName: "Fizetési mód", field: "payment_type", sortable: true },
        { headerName: "Bankszámlaszám", field: "bank_account", sortable: true }
      ],
      rowData: null,
      gridOptions: {
        onRowClicked: row => {
          const selectedRow = row.data;
          this.formOpen = !this.formOpen;
          this.selectedRowIndexAction(row.rowIndex);
          this.selectRowAction(selectedRow);
        },
        rowStyle: {
          width: "100%"
        }
      },
      modules: AllCommunityModules
    };
  },
  computed: {
    ...mapGetters(["getTableData", "getSelectedRow"])
  },
  methods: {
    ...mapActions(["selectRowAction", "selectedRowIndexAction"]),
    createData() {
      this.formOpen = !this.formOpen;
      this.selectRowAction([]);
    }
  },
  mounted() {
    this.rowData = this.getTableData;
  },
  components: {
    appModal: Modal,
    AgGridVue
  },
  watch: {
    getTableData(newValue, oldValue) {
      this.rowData = this.getTableData;
    }
  }
};
</script>

<style scoped>
.row {
  margin-bottom: 20px;
}
</style>
