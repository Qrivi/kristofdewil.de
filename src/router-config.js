import Home from './segments/Home.vue';

export default {
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/blog', component: Home }
  ]
};
