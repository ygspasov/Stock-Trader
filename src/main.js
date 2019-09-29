import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import store from "./store/store";

import { routes } from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes
});

Vue.filter("showFunds", function(funds) {
  return "$" + funds.toLocaleString();
});

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
