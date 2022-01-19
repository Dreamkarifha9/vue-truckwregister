export default {

  SET_PARKINGLOT(state, parkinglot) {
    state.parkinglotlist = parkinglot.records;
    state.totalpage = parkinglot.filtered;
    state.totallist = parkinglot.total;
  },
  SET_CLEARPARKINGLOT (state) {
    state.parkinglotlist = [];
    state.totalpage = 0;
    state.totallist = 0;
  }
};
