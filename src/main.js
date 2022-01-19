import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueMask from 'v-mask'
import VuetifyConfirm from 'vuetify-confirm'


Vue.config.productionTip = false;
Vue.use(VueMask);
Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: 'Accept',
  buttonFalseText: 'Discard',
  color: 'warning',
  icon: 'warning',
  title: 'Warning',
  width: 350,
  property: '$confirm'
});
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
