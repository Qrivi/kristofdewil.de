<template>
  <div id="content" role="main">
    <navigation />
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  components: {
    Navigation
  },
  data() {
    console.log("Hello world");
    return {
      title: "Hello website"
    };
  }
};
</script>

<style lang="scss" scoped>
h1 {
  color: $color-primary;
  font-size: $default-font-size;
  font-family: $header-font-family;
}
</style>
