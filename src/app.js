import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueMoment from 'vue-moment';

import App from './App.vue';
import storeConfig from './store-config';
import routerConfig from './router-config';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueMoment);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: new Vuex.Store(storeConfig),
  router: new VueRouter(routerConfig),
  render: h => h(App),
});
