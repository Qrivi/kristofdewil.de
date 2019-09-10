<template>
  <main>
    <AppHeader :static="ready" />
    <AppActivity v-if="ready" />
  </main>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import AppActivity from '../components/AppActivity.vue';

export default {
  name: 'Home',
  components: {
    AppHeader,
    AppActivity
  },
  data() {
    return {
      ready: window.location.hash.includes('ready'),
    };
  },
  mounted() {
    setTimeout( () => {
      this.ready = true;
    }, window.innerWidth > 650 ? 7500 : 2000 );
  }
};
</script>
