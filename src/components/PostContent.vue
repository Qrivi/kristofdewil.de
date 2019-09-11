<template>
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
        const $ = cheerio.load(content);
        this.html = $('main').html();
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
