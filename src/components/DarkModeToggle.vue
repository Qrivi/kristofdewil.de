<template>
  <ul>
    <li>
      <label>
        <input type="radio" name="mode" v-model="mode" value="system" />
        System
      </label>
      <label>
        <input type="radio" name="mode" v-model="mode" value="light" />
        Light
      </label>
      <label>
        <input type="radio" name="mode" v-model="mode" value="dark" />
        Dark
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      mode: "?",
    };
  },
  mounted() {
    // Get mode from localStorage or fall back to system default
    this.mode = (localStorage && localStorage.getItem("mode")) ?? "system";
    // Listen for changes to system default and adapt page on the fly
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        event.matches ? this.dark() : this.light();
      });
    // Add a transition delay after page is loaded to avoid "blinking" on load
    window.setTimeout(() => {
      document.body.style.transition = "all 500ms";
    }, 1000);
  },
  watch: {
    mode: function (mode) {
      mode === "dark" ||
      (mode === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? this.dark()
        : this.light();
      localStorage && localStorage.setItem("mode", mode);
    },
  },
  methods: {
    light() {
      document.body.classList.remove("force-dark");
      document.body.classList.add("force-light");
    },
    dark() {
      document.body.classList.remove("force-light");
      document.body.classList.add("force-dark");
    },
  },
};
</script>

<style lang="scss" scoped></style>
