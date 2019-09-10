<template>
  <div role="application">
    <header id="app-topbar">
      <h1 class="h">
        Kristof Dewilde
      </h1>
      <AppNavigation />
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import AppNavigation from './components/AppNavigation.vue';

export default {
  components: {
    AppNavigation
  }
};
</script>

<style lang="scss">
#app-topbar {
  height: 100px;
}
</style>
