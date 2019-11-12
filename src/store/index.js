import Vue from "vue";
import Vuex from "vuex";
import dataTableModule from "./modules/dataTableModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    dataTableModule
  }
});
