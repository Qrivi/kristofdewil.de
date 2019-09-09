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
