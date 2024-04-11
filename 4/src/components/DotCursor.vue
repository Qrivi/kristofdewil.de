<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const customCursor = ref<HTMLDivElement | null>(null);

const updateCursorPosition = (x: number, y: number) => {
  if (customCursor.value) {
    customCursor.value.style.opacity = "1";
    customCursor.value.style.top = `${y}px`;
    customCursor.value.style.left = `${x}px`;
  }
};

const mouseMoveHandler = (e: MouseEvent) => {
  return updateCursorPosition(e.pageX, e.pageY);
};

const mouseOverHandler = ({ target }: MouseEvent) => {
  if (customCursor.value && target instanceof HTMLElement) {
    const isReactive = target.tagName === "A";
    customCursor.value.classList.toggle("reactive", isReactive);
  }
};

const mouseOutHandler = () => {
  if (customCursor.value) {
    customCursor.value.style.opacity = "0";
  }
};

onMounted(() => {
  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseover", mouseOverHandler);
  document.addEventListener("mouseout", mouseOutHandler);
  document.addEventListener("scroll", mouseOutHandler);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousemove", mouseMoveHandler);
  document.removeEventListener("mouseover", mouseOverHandler);
  document.removeEventListener("mouseout", mouseOutHandler);
  document.removeEventListener("scroll", mouseOutHandler);
});
</script>

<style>
#cursor {
  display: none;
}

body.custom-cursor {
  cursor: none !important;

  * {
    cursor: none !important;
  }

  #cursor {
    --radius: 0.5rem;

    display: block;
    position: absolute;
    z-index: 1069;
    top: 50dvh;
    left: 50dvw;
    width: calc(var(--radius) * 2);
    height: calc(var(--radius) * 2);
    margin: calc(var(--radius) * -1) 0 0 calc(var(--radius) * -1);
    background-color: var(--color-text-muted);
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    mix-blend-mode: exclusion;
    transition: background-color 500ms, opacity 250ms;

    &.reactive {
      background-color: var(--color-accent);
    }
  }
}
</style>

<template>
  <div ref="customCursor" id="cursor">&nbsp;</div>
</template>
