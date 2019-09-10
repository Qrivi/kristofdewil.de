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
  computed: {
    ready() {
      return this.$store.getters.isReady;
    }
  },
  mounted() {
    this.$store.dispatch('becomeReady', window.innerWidth > 650 ? 7500 : 2000);
  }
};
</script>
