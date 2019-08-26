<template>
  <div role="application">
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
      dummytext: "Hello Denzel"
    };
  }
};
</script>

<style lang="scss">
p{
  padding: 20px;
}
</style>
