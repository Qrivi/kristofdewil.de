<template>
  <transition name="fade">
    <svg v-if="loading" :style="{top}" viewBox="0 0 100 100">
      <ellipse class="fadein" cx="50" cy="50" rx="30" ry="30" />
      <line class="fadein" x1="52.7" y1="57.1" x2="82.5" y2="83" />
    </svg>
  </transition>
</template>

<script>
export default {
  name: 'AppLoader',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    top: {
      type: String,
      default: 'calc(50vh - 20px)'
    }
  }
}
</script>

<style scoped lang="scss">
svg {
  width: 40px;
  position: absolute;
  top: calc(50vh - 20px);
  left: calc(50% - 20px);
  fill: none;
  stroke: var(--text);
  stroke-width: 10;
  stroke-miterlimit: 10;
  animation: loading-rotation 1.2s linear infinite;
  transform-origin: 50% 50%;

  ellipse, line {
    animation-delay: 2.5s !important;
  }
}

@keyframes loading-rotation {
  50% {
    stroke: var(--accent);
  }
  100% {
    transform: rotate(720deg);
  }
}

.fade-leave-active {
  transition: opacity .25s ease-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
