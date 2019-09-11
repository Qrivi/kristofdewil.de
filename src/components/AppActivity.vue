<template>
  <section id="app-activity">
    <AppLoader :loading="!posts.length" />
    <h2 class="h">
      Recent activity
    </h2>
    <transition-group name="appear" tag="ul">
      <PostSummary
        v-for="(post, index) in posts"
        :key="`${post.date} | ${post.title}`"
        :title="post.title"
        :intro="post.intro"
        :link="post.link"
        :date="post.date"
        :banner="post.banner"
        :tags="post.tags"
        :style="`transition-delay: ${index / 4}s`"
      />
    </transition-group>
  </section>
</template>

<script>
import AppLoader from './AppLoader.vue';
import PostSummary from './PostSummary.vue';

export default {
  name: 'AppActivity',
  components: {
    AppLoader,
    PostSummary
  },
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    fetch('/api/posts.json.liquid')
      .then(response => response.json())
      .then(json => { this.posts = json; });
  }
};
</script>

<style scoped lang="scss">
section {
  margin: 120px auto 80px;

  @media only screen and (max-width: 650px) {
    margin-top: 20px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    @media (max-width: 3139px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 2239px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 1439px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}

.appear-enter-active, .appear-leave-active {
  transition: opacity 1s ease-out, transform 1s ease-out;
}
.appear-enter, .appear-leave-to {
  opacity: 0;
  transform: translateY(-25px);
}
</style>
