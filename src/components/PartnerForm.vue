<template>
  <form>
    <div class="field">
      <label class="label">Név</label>
      <div class="control">
        <input
          :class="{ 'is-danger': !$v.name.required }"
          class="input"
          type="text"
          placeholder="Név"
          v-model.lazy="$v.name.$model"
        />
      </div>
      <p v-if="!$v.name.required" class="help is-danger">
        A név mező kitöltése kötelező!
      </p>
    </div>
    <div class="field">
      <label class="label">Partner típusa</label>
      <label class="checkbox checkbox-field">
        <input type="checkbox" value="vevő" v-model.lazy="$v.type.$model" />
        Vevő
      </label>
      <label class="checkbox checkbox-field">
        <input type="checkbox" value="szállító" v-model.lazy="$v.type.$model" />
        Szállító
      </label>
      <p v-if="!$v.type.required" class="help is-danger">
        A típus megadása kötelező
      </p>
    </div>
    <div class="field">
      <label class="label">Tagság</label>
      <div class="control">
        <label class="radio">
          <input
            type="radio"
            name="partnership"
            value="belföld"
            v-model.lazy="$v.partnership.$model"
          />
          Belföldi
        </label>
        <label class="radio">
          <input
            type="radio"
            name="partnership"
            value="eu"
            v-model.lazy="$v.partnership.$model"
          />
          EU
        </label>
        <label class="radio">
          <input
            type="radio"
            name="partnership"
            value="eu-n kívül"
            v-model.lazy="$v.partnership.$model"
          />
          EU-n kívül
        </label>
      </div>
      <p v-if="!$v.partnership.required" class="help is-danger">
        Tagság megadása kötelező!
      </p>
    </div>
    <div class="field">
      <label class="label">Fizetés módja</label>
      <div class="select">
        <select name="payment_type" v-model.lazy="$v.payment_type.$model">
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
          v-model.lazy="$v.bank_account.$model"
        />
      </div>
      <p v-if="!$v.bank_account.required" class="help is-danger">
        Bankszámlaszám megadása kötelező!
      </p>
      <p v-if="!$v.bank_account.minLength" class="help is-danger">
        A bankszámlaszám minimális hossza 20 karakter!
      </p>
    </div>
    <div class="field">
      <button class="button is-success" @click.prevent="saveRow()">
        Mentés
      </button>
      <button class="button is-success" @click.prevent="resetTouch()">
        Reset touched
      </button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      name: "",
      type: [],
      payment_type: "",
      bank_account: "",
      partnership: "",
      submitStatus: null
    };
  },
  validations: {
    name: {
      required
    },
    type: {
      required
    },
    payment_type: {
      required
    },
    bank_account: {
      required,
      minLength: minLength(20)
    },
    partnership: {
      required
    }
  },
  methods: {
    ...mapActions(["saveEditedRowAction", "createRowAction"]),
    saveRow() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        const rowData = [
          {
            name: this.name,
            type: this.type.filter(function(el) {
              return el != null;
            }),
            partnership: this.partnership,
            payment_type: this.payment_type,
            bank_account: this.bank_account
          },
          { index: this.getSelectedRowIndex }
        ];

        if (this.getSelectedRow.length === 0) {
          this.createRowAction(rowData[0]);
        } else {
          this.saveEditedRowAction(rowData);
        }
      }
    },
    resetTouch() {
      this.$v.$reset();
    }
  },
  computed: {
    ...mapGetters(["getSelectedRow", "getTableData", "getSelectedRowIndex"])
  },
  mounted() {
    this.name = this.getSelectedRow.name;
    this.type = [this.getSelectedRow.type];
    this.partnership = this.getSelectedRow.partnership;
    this.payment_type = this.getSelectedRow.payment_type;
    this.bank_account = this.getSelectedRow.bank_account;
  }
};
</script>

<style scoped>
.checkbox.checkbox-field {
  margin-right: 20px;
}
</style>
