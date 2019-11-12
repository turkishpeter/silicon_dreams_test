<template>
  <form>
    <div class="field">
      <label class="label">Név</label>
      <div class="control">
        <input class="input" type="text" placeholder="Név" v-model="name" />
      </div>
    </div>
    <div class="field">
      <label class="label">Partner típusa</label>
      <label class="checkbox">
        <input type="checkbox" value="vevő" v-model="type" />
        Vevő
      </label>
      <label class="checkbox">
        <input type="checkbox" value="szállító" v-model="type" />
        Szállító
      </label>
    </div>
    <div class="field">
      <label class="label">Tagság</label>
      <div class="control">
        <label class="radio">
          <input type="radio" name="partnership" value="belföld" v-model="partnership" />
          Belföldi
        </label>
        <label class="radio">
          <input type="radio" name="partnership" value="eu" v-model="partnership" />
          EU
        </label>
        <label class="radio">
          <input type="radio" name="partnership" value="eu-n kívül" v-model="partnership" />
          EU-n kívül
        </label>
      </div>
    </div>
    <div class="field">
      <label class="label">Fizetés módja</label>
      <div class="select">
        <select name="payment_type" v-model="payment_type">
          <option value="online">Online bankkártyás fizetés</option>
          <option value="money">Készpénz</option>
        </select>
      </div>
    </div>
    <div class="field">
      <label class="label">Bankszámlaszám</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Bankszámlaszám"
          name="bankaccount"
          v-model="bank_account"
        />
      </div>
    </div>
    <div class="field">
      <button class="button is-success" @click.prevent="saveRow()">Mentés</button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      type: [],
      payment_type: "",
      bank_account: "",
      partnership: ""
    };
  },
  methods: {
    ...mapActions(["saveEditedRowAction"]),
    saveRow() {
      const rowData = {
        name: this.name,
        type: this.type[0],
        partnership: this.partnership,
        payment_type: this.payment_type,
        bank_account: this.bank_account
      };
      this.saveEditedRowAction(rowData);
    }
  },
  computed: {
    ...mapGetters(["getSelectedRow"])
  },
  mounted() {
    // console.log(this.getSelectedRow);
    // console.log(this.partnership);
    this.name = this.getSelectedRow[0];
    this.type = [this.getSelectedRow[1]];
    this.partnership = this.getSelectedRow[2];
    this.payment_type = this.getSelectedRow[3];
    this.bank_account = this.getSelectedRow[4];
    // console.log(this.getSelectedRow);
    // console.log(this.type);
  }
};
</script>

<style>
</style>