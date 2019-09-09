<template>
  <li class="summary">
    <time :datetime="technicalDate">{{ printableDate }}</time>
    <a :href="link">
      <h3>{{ title }}</h3>
    </a>
    <img
      v-if="banner"
      :src="`/assets/img/banners/${banner}`"
      :alt="title"
      loading="lazy"
    >
    <p>{{ short }}</p>
    <ul v-if="tags">
      <li
        v-for="(tag, index) in tags"
        :key="index"
      >
        <a :href="`/?tag=${tag}`">{{ tag }}</a>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'PostSummary',
  props: {
    title: {
      type: String,
      default: 'Placeholder for the post title'
    },
    short: {
      type: String,
      default: 'Placeholder for the post description.'
    },
    link: {
      type: String,
      default: '/'
    },
    date: {
      type: String,
      default: 'Publish date unknown'
    },
    banner: {
      type: String,
      default: null
    },
    tags: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    printableDate() {
      return this.$moment(this.date, 'YYYY-MM-DD HH:mm:ss Z' ).format('MMMM D, YYYY');
    },
    technicalDate() {
      return this.$moment(this.date, 'YYYY-MM-DD HH:mm:ss Z').format('YYYY-MM-DD');
    }
  }
};
</script>

<style lang="scss" scoped>
li.summary {
  position: relative;
  margin: 40px 80px;
  padding: 10px 20px;
  border-left: solid 1px var(--dim);

  @media only screen and (max-width: 650px) {
    font-size: .9em;
    margin: 20px 10px;
  }

  &:hover img {
    opacity: 0.1;
  }

  img {
    position: absolute;
    object-fit: cover;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 5s ease-out;
  }

  time {
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-size: 0.8em;
    opacity: 0.5;
  }

  h3 {
    font: 700 1.6em/1.4em $font-regular;
    margin: 5px 0 25px;
    transition: color 0.5s;

    &:hover {
      color: var(--accent);
    }
  }

  p {
    opacity: 0.9;
  }

  li {
    display: inline;
    font-size: 0.7em;
    color: var(--accent);
    transition: opacity 0.5s;

    &:hover {
      opacity: 0.75;
    }

    a {
      display: inline-block;
      margin: 0 10px 0 0;
      padding: 10px 0;
    }

    &:before {
      content: "#";
    }
  }
}
</style>
