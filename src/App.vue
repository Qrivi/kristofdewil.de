<template>
  <div role="application">
    <header>
      <h1 class="h">
        Kristof Dewilde
      </h1>
      <AppNavigation v-if="ready" />
      <AppHeader :static="ready" />
    </header>
    <main v-if="ready">
      <SectionActivity />
    </main>
  </div>
</template>

<script>
import AppNavigation from './segments/AppNavigation.vue';
import AppHeader from './segments/AppHeader.vue';
import SectionActivity from './segments/SectionActivity.vue';
import { setTimeout } from 'timers';

export default {
  components: {
    AppNavigation,
    AppHeader,
    SectionActivity,
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

<style lang="scss">
main{
  margin: 120px auto 20px;
  animation: fade 1s ease-out forwards;
  opacity: 0;

  @media only screen and (max-width: 650px) {
    margin-top: 20px;
  }

  @keyframes fade {
    100% {
      opacity: 1;
    }
  }
}
</style>
