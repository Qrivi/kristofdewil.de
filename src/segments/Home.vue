<template>
  <main>
    <AppHeader
      v-show="!$route.params.post"
      :still="$store.getters.isReady"
    />
    <AppActivity
      v-if="$store.getters.isReady"
      v-show="!$route.params.post"
    />
    <transition name="quickfade">
      <PostContent
        v-if="$route.params.post"
        :post="$route.params.post"
      />
    </transition>
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
  mounted() {
    if (!this.$route.params.post && !this.$store.getters.isReady)
      this.$store.dispatch('becomeReady', window.innerWidth > 650 ? 8000 : 2500);
  }
};
</script>
