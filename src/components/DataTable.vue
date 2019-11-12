<template>
  <div class="container">
    <div class="row">
      <table id="dataTable" class="display">
        <thead>
          <tr>
            <th>Név</th>
            <th>Típus</th>
            <th>Tagság</th>
            <th>Fizetési mód</th>
            <th>Bankszámlaszám</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :key="partner.bank_account"
            v-for="partner in this.getTableData"
            @click="modifyData($event)"
          >
            <td>{{ partner.name }}</td>
            <td>{{ partner.type }}</td>
            <td>{{ partner.partnership }}</td>
            <td>{{ partner.payment_type }}</td>
            <td>{{ partner.bank_account }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row">
      <button class="button">Új partner</button>
    </div>
    <app-modal v-if="formOpen" @formWasClosed="formOpen = $event" />
  </div>
</template>

<script>
import $ from "jquery";
import dataTable from "datatables.net-bs";
import Modal from "./Modal";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      formOpen: false,
      table: ""
    };
  },
  computed: {
    ...mapGetters(["getTableData", "getSelectedRow"])
  },
  methods: {
    ...mapActions(["selectRowAction"]),
    initDataTable() {
      return $("#dataTable").DataTable({
        searching: false,
        paging: false
      });
    },
    modifyData(event) {
      this.formOpen = !this.formOpen;

      // console.log(event.target.parentNode);
      var selectedRow = this.table.row(event.target.parentNode).data();
      console.log(selectedRow);
      // this.table.draw();
      this.selectRowAction(selectedRow); //itt lő egy actiont

      // console.log(this.getSelectedRow);
    }
  },
  // watch: {
  //   getTableData: function(oldValue, newValue) {
  //     this.initDataTable();
  //   }
  // },
  mounted() {
    this.table = this.initDataTable();
  },
  components: {
    appModal: Modal
  }
};
</script>

<style></style>
