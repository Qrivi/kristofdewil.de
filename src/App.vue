<template>
  <div role="application">
    <header id="app-topbar">
      <h1 class="h">
        Kristof Dewilde
      </h1>
      <AppNavigation v-if="ready" class="fadein" />
    </header>
    <router-view />
  </div>
</template>

<script>
import AppNavigation from './components/AppNavigation.vue';

export default {
  components: {
    AppNavigation
  },
  computed: {
    ready() {
      return this.$store.getters.isReady;
    }
  },
};
</script>

<style lang="scss">
#app-topbar {
  height: 100px;
  opacity: 0;
  animation: fadein 5s forwards;
}
</style>
