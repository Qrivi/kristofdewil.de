import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMoment from 'vue-moment';
import VueAxios from 'vue-axios';
import axios from 'axios';
import App from './App.vue';

import Home from './segments/Home.vue';

Vue.use(VueRouter);
Vue.use(VueMoment);
Vue.use(VueAxios, axios);

const routes = [
  { path: '/', component: Home },
  { path: '/blog', component: Home }
];

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: new VueRouter({
    routes, mode: 'history'
  }),
  render: h => h(App),
});
