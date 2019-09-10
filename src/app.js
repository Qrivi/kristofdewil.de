import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueMoment from 'vue-moment';
import VueAxios from 'vue-axios';
import axios from 'axios';

import App from './App.vue';
import storeConfig from './store-config';
import routerConfig from './router-config';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueMoment);
Vue.use(VueAxios, axios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: new Vuex.Store(storeConfig),
  router: new VueRouter(routerConfig),
  render: h => h(App),
});
