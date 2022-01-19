export default {

  SET_REGISTERTEMPBYCARID(state, registertempbycarid) {
    state.registertempbycarid = registertempbycarid;
  },
  SET_CLEARTEMP (state) {
    state.registertempbycarid = []
  }
};
