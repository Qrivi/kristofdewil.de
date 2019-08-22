<template>
  <div id="content" role="main">
    <AppHeader />
    <p>{{dummytext}}</p>
  </div>
</template>

<script>
import AppHeader from "./segments/AppHeader.vue";

export default {
  components: {
    AppHeader
  },
  data() {
    return {
      dummytext: "Hello world"
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
