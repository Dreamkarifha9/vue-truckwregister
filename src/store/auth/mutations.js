export default {
  SET_TOKEN(state, token) {
    state.token = token;
  },

  SET_USER(state, user) {
    state.user = user;
  },

  SET_CLEARITEM_AUTH (state, clear) {
    state.user = clear;
    state.permission = clear;
  },

  SET_PERMISSION (state, permission) {
    state.permission = permission
  }
};
