import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth/index";
import snackbar from "./snackbar/index";
import carregister from "./carregister/index";
import truckcartype from "./truckcartype/index";
import truckqgroup from "./truckqgroup/index";
import registertemp from "./registertemp/index"
import test from "./test/index"
import parkinglot from "./parkinglot/index"





Vue.use(Vuex);

export default new Vuex.Store({
  state: { loader: false },
  mutations: {
    LOADER(state, payload) {
      state.loader = payload;
    },
  },
  actions: {},
  modules: {
    auth,
    snackbar,
    carregister,
    truckcartype,
    truckqgroup,
    registertemp,
    test,
    parkinglot,
  },
});
