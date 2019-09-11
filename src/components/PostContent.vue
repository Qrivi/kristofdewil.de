<template>
  <section id="post-content" class="article" v-html="article">
      Content of {{ post }} will come here.
  </section>
</template>

<script>
export default {
  name: 'PostContent',
  props: {
    post: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      article: '<p>Loading pls wait</p>'
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
