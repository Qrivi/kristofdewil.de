<template>
  <div role="application">
    <AppHeader />
    <main v-if="appLoaded">
      <SectionActivity />
    </main>
  </div>
</template>

<script>
import AppHeader from './segments/AppHeader.vue';
import SectionActivity from './segments/SectionActivity.vue';
import { setTimeout } from 'timers';

export default {
  components: {
    AppHeader,
    SectionActivity,
  },
  data() {
    return {
      appLoaded: false,
    };
  },
  mounted() {
    setTimeout( () => {
      this.appLoaded = true;
    }, window.innerWidth > 650 ? 7500 : 2000 );
  }
};
</script>

<style lang="scss">
main{
  margin: 20px auto;
  animation: fade 1s ease-out forwards;
  opacity: 0;

  @keyframes fade {
    100% {
      opacity: 1;
    }
  }
}
</style>
