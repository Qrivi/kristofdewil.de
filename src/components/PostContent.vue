<template>
  <section id="post-content" class="article" v-html="html">
      Content of {{ post }} will come here.
  </section>
</template>

<script>
import cheerio from 'cheerio';

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
      html: '<p>Loading pls wait</p>'
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
