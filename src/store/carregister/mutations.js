export default {

  SET_CARREGISTER(state, carregister) {
    state.carregister = carregister;
  },
  SET_CARJOIN(state, carregister) {
    state.carjoinlist = carregister;
  },
  SET_COTALIST (state, cotalist) {
    state.cotalist = cotalist
  },
  SET_BRANCHCARREGISTER(state, branchcarregister) {
    state.branchcarregisterlist = branchcarregister;
  },
  SET_CLEARCARREGISTER (state) {
    state.carregister = []
  },
  SET_CLEARCOTALIST (state) {
    state.cotalist = []
  },
  SET_CLEARCARJOIN (state) {
    state.carjoinlist = []
  }
};
