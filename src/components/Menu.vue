<template>
  <div id="menu">
    actualmenu
  </div>
</template>

<script>
export default {
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  #menu {
    position: fixed;
    z-index: -10;
    top: 0;
    left: 0;
    min-height: 100vh;
    width: calc(100vw - 50px);
    max-width: 500px;
    background: hotpink;
  }
</style>
