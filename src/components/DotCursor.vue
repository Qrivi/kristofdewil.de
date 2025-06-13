<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const customCursor = ref<HTMLDivElement | null>(null);
const isOverLink = ref(false);

const mouseMoveHandler = (e: MouseEvent) => {
  if (customCursor.value) {
    customCursor.value.style.opacity = "1";
    customCursor.value.style.top = `${e.pageY}px`;
    customCursor.value.style.left = `${e.pageX}px`;
  }
};

const mouseOverHandler = ({ target }: MouseEvent) => {
  if (customCursor.value && target instanceof HTMLElement) {
    isOverLink.value = target.tagName === "A";
  }
};

const mouseOutHandler = () => {
  if (customCursor.value) {
    customCursor.value.style.opacity = "0";
  }
};

onMounted(() => {
  document.documentElement.classList.add("no-cursor");
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

<template>
  <div ref="customCursor" :class="[
         'absolute w-[1rem] h-[1rem] z-[9999] -translate-1/2 bg-foreground/75 rounded-full opacity-0 pointer-events-none mix-blend-exclusion duration-500 transition-[color,opacity]',
         {'hidden': !customCursor},
         {'bg-primary': isOverLink}
         ]">&nbsp;</div>
</template>

<style>

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
