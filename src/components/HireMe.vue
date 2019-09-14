<template>
  <transition name="banger">
    <section v-if="$store.getters.isReady" id="hireme">
      <p class="hireme-title">
        Become colleagues?
      </p>
      <p class="hireme-text">
        Boy, wouldn't that be awesome! I am currently open to new job opportunities. Check out my <a href="https://github.com/Qrivi" target="_blank">GitHub</a> or <a href="https://linkedin.com/in/Qrivi" target="_blank">LinkedIn</a> profile, or the latest version of  <a class="hireme-button" href="https://cv.kristofdewil.de">my resume</a>!
      </p>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'HireMe'
}
</script>

<style scoped lang="scss">
#hireme {
  position: relative;
  max-width: 580px;
  margin: 150px auto 0;

  &:before, &:after {
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    border-top: solid 1px var(--accent);
    border-right: solid 1px var(--accent);
    width: 25px;
    height: 25px;
  }

  &:after {
    border-top: none;
    border-right: none;
    border-bottom: solid 1px var(--accent);
    border-left: solid 1px var(--accent);
    top: auto;
    right: auto;
    bottom: 0;
    left: 0;
  }

  .hireme-title {
    font: 3em/1em $font-writing;
    text-align: center;
  }

  .hireme-text {
    padding: 20px;

    a {
      color: var(--accent);

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.banger-enter-active {
  animation: banger .5s;
}
@keyframes banger {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
