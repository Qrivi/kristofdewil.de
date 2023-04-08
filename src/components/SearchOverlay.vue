<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    size: String,
  },
  methods: {
    closeSearch() {
      document.body.classList.remove("search");
    },
  },
});
</script>

<template>
  <div class="overlay" @click="closeSearch">
    <section>TODO</section>
  </div>
</template>

<style scoped lang="scss">
body:not(.search) .overlay {
  display: none;
  opacity: 0;
}
.overlay {
  position: fixed;
  z-index: 999;
  inset: 0;
  display: grid;
  place-items: center;
  background-color: rgb(0 0 0 / 0.2);
  backdrop-filter: blur(3px);
  opacity: 1;
  transition: opacity 250s;

  section {
    background-color: var(--color-background);
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
  }
}
</style>
