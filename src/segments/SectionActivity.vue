<template>
  <section id="activity">
    <h2 class="h">Recent activity</h2>
    <ul>
      <PostSummary
        v-for="post in posts"
        :key="`${post.date} | ${post.title}`"
        :title="post.title"
        :short="post.short"
        :link="post.link"
        :date="new Date(post.date)"
        :banner="post.banner"
        :tags="post.tags"
      />
    </ul>
  </section>
</template>

<script>
import PostSummary from "../components/PostSummary.vue";

export default {
  name: "SectionActivity",
  components: {
    PostSummary
  },
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.axios.get("/api/posts.json.x").then(response => {
      this.posts = response.data;
    });
  }
};
</script>

<style scoped lang="scss">
section {
  > ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1600px) {
    > ul {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
