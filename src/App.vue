<template>
  <div role="application">
    <header id="app-topbar">
      <h1 class="h">
        Kristof Dewilde
      </h1>
      <AppNavigation v-if="ready" class="fade" />
    </header>
    <transition name="quickfade" mode="out-in">
      <router-view />
    </transition>
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
  position: relative;
  z-index: 99;
  top: 0;
  width: 100%;
  height: 100px;
}

.slowfade-enter-active, .slowfade-leave-active {
  transition: opacity 1s ease-out;
}
.quickfade-enter-active, .quickfade-leave-active {
  transition: opacity .25s ease-out;
}
.slowfade-enter, .slowfade-leave-to, .quickfade-enter, .quickfade-leave-to {
  opacity: 0;
}
</style>
