<template>
  <main>
    <AppHeader
      v-show="!$route.params.post"
      :static="ready"
    />
    <AppActivity
      v-if="ready"
      v-show="!$route.params.post"
    />
    <PostContent
      v-if="$route.params.post"
      :post="$route.params.post"
    />
  </main>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import AppActivity from '../components/AppActivity.vue';
import PostContent from '../components/PostContent.vue';

export default {
  name: 'Home',
  components: {
    AppHeader,
    AppActivity,
    PostContent
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
