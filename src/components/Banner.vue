<template>
  <div
    id="banner"
    :style="{
      opacity: opacity,
      backgroundImage: banner ? 'url(public/banners/' + banner + ')' : 'none',
    }"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      opacity: 0,
      banner: null,
    };
  },
  mounted() {
    document.addEventListener("banner", (e) => {
      if (e.detail) {
        this.banner = e.detail;
        this.opacity = .2;
      } else {
        this.opacity = 0;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
#banner {
  position: fixed;
  background-size: cover;
  top: 0;
  right: 0;
  width: 100vw;
  height: 50vh;
  z-index: -1;
  transition: opacity 1s 500ms ease-in, background-image 1s 500ms ease-in;

  &:after {
    content: " ";
    position: absolute;
    display: block;
    background: linear-gradient(180deg, transparent, var(--scene));
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}
</style>
