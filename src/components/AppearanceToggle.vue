<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

type Appearance = "system" | "light" | "dark";
const isAppearance = (value: string): value is Appearance => {
  return ["system", "light", "dark"].includes(value);
};

const appearance = ref<Appearance>("system");

const light = () => {
  document.body.classList.remove("dark");
  document.body.classList.add("light");
};

const dark = () => {
  document.body.classList.remove("light");
  document.body.classList.add("dark");
};

watch(appearance, (newAppearance) => {
  newAppearance === "dark" || (newAppearance === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ? dark()
    : light();
  localStorage?.setItem("mode", newAppearance);
});

onMounted(() => {
  // Get mode from localStorage or fall back to system default
  const storedAppearance = localStorage?.getItem("mode") ?? "";
  appearance.value = isAppearance(storedAppearance) ? storedAppearance : "system";
  // Listen for changes to system default and adapt page on the fly
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    event.matches ? dark() : light();
  });
  // Add a transition delay after page is loaded to avoid "blinking" on load
  window.setTimeout(() => {
    document.body.style.transition = "all 500ms";
  }, 1000);
});
</script>

<style scoped>
ul {
  display: flex;
  column-gap: 1rem;
  list-style-type: none;
}
</style>

<template>
  <ul>
    <li>
      <label>
        <input type="radio" name="mode" v-model="appearance" value="system" />
        System
      </label>
    </li>
    <li>
      <label>
        <input type="radio" name="mode" v-model="appearance" value="light" />
        Light
      </label>
    </li>
    <li>
      <label>
        <input type="radio" name="mode" v-model="appearance" value="dark" />
        Dark
      </label>
    </li>
  </ul>
</template>
