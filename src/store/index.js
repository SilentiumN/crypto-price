

import { createStore } from "vuex";
import {cryptoCompareModule} from "./cryptoCompare.module";

export default createStore({
  state() {
    return {};
  },

  modules: {
    cryptoCompareModule
  },

  getters: {},

  mutations: {},

  actions: {
  },
});