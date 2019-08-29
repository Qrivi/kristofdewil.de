import Vue from 'vue';
import VueMoment from 'vue-moment';
import VueAxios from 'vue-axios';
import axios from 'axios';
import App from './App.vue';

Vue.use(VueMoment);
Vue.use(VueAxios, axios);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
