<template>
  <div class="modal" :class="{ 'is-active' : isActive}">
    <div class="modal-background" @click="closeModal()"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Partner szerkesztése</p>
        <button class="delete" aria-label="close" @click="closeModal()"></button>
      </header>
      <section class="modal-card-body">
        <app-partner-form />
      </section>
    </div>
  </div>
</template>

<script>
import PartnerForm from "./PartnerForm";
export default {
  data() {
    return {
      isActive: true,
      formIsClosed: false
    };
  },
  methods: {
    closeModal() {
      this.isActive = !this.isActive;
      console.log(this.isActive);
      this.$emit("formWasClosed", this.formIsClosed);
    }
  },
  components: {
    appPartnerForm: PartnerForm
  }
};
</script>

<style>
</style>