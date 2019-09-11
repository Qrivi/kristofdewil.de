<template>
  <!-- eslint-disable vue/no-v-html -->
  <section id="post-content" class="article" v-html="article">
    <AppLoader :loading="!article.length" />
    <h2 class="h">
      Blog post
    </h2>
  </section>
</template>

<script>
import AppLoader from './AppLoader.vue';

export default {
  name: 'PostContent',
  components: {
    AppLoader
  },
  props: {
    post: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      article: ''
    }
  },
  mounted() {
    fetch(`/blog/${this.post}`)
      .then(response => response.text())
      .then(content => {
        this.article = content.match(/<main class="article">((.|\n)*)<\/main>/)[1];
      });
  }
}
</script>

<style scoped lang="scss">
#post-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--background);
}
</style>
