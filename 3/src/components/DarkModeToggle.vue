<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

const mode = ref("system");

onMounted(() => {
  // Get mode from localStorage or fall back to system default
  mode.value = (localStorage && localStorage.getItem("mode")) ?? "system";
  // Listen for changes to system default and adapt page on the fly
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    event.matches ? dark() : light();
  });
  // Add a transition delay after page is loaded to avoid "blinking" on load
  window.setTimeout(() => {
    document.body.style.transition = "all 500ms";
  }, 1000);
});

watch(mode, (newMode) => {
  newMode === "dark" ||
  (newMode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ? dark()
    : light();
  localStorage && localStorage.setItem("mode", newMode);
});

function light() {
  document.body.classList.remove("dark");
  document.body.classList.add("light");
}

function dark() {
  document.body.classList.remove("light");
  document.body.classList.add("dark");
}
</script>

<template>
  <ul>
    <li>
      <label>
        <input type="radio" name="mode" v-model="mode" value="system" />
        System
      </label>
    </li>
    <li>
      <label>
        <input type="radio" name="mode" v-model="mode" value="light" />
        Light
      </label>
    </li>
    <li>
      <label>
        <input type="radio" name="mode" v-model="mode" value="dark" />
        Dark
      </label>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  display: flex;
  column-gap: 1rem;
  list-style-type: none;
}
</style>
