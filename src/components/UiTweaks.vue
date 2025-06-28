<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import { useSyncedRef } from "../composables/useSyncedRef";

const isOverLink = ref(false);

const showCursorSyncedRef = useSyncedRef("showCursor", false);
const showScrollbarSyncedRef = useSyncedRef("showScrollbar", false);

const popoverRef = ref<HTMLDivElement | null>(null);
const cursorRef = ref<HTMLDivElement | null>(null);

const mouseMoveHandler = (e: MouseEvent) => {
  if (cursorRef.value) {
    cursorRef.value.style.opacity = "1";
    cursorRef.value.style.top = `${e.clientY}px`;
    cursorRef.value.style.left = `${e.clientX}px`;
  }
};

const mouseOverHandler = ({ target }: MouseEvent) => {
  if (cursorRef.value && target instanceof HTMLElement) {
    isOverLink.value = target.tagName === "A";
  }
};

const mouseOutHandler = () => {
  if (cursorRef.value) {
    cursorRef.value.style.opacity = "0";
  }
};

const dialogOpenedHandler = () => {
  if (!showCursorSyncedRef.value) {
    // Put it at the top of the top layer
    popoverRef.value?.hidePopover();
    popoverRef.value?.showPopover();
  }
};

onBeforeUnmount(() => {
  document.removeEventListener("mousemove", mouseMoveHandler);
  document.removeEventListener("mouseover", mouseOverHandler);
  document.removeEventListener("mouseout", mouseOutHandler);
  document.removeEventListener("scroll", mouseOutHandler);
  window.removeEventListener("dialogopened", dialogOpenedHandler);
});

watch(
  [showCursorSyncedRef, popoverRef],
  ([showCursorSyncedRefValue]) => {
    if (showCursorSyncedRefValue) {
      popoverRef.value?.hidePopover();
      document.documentElement.classList.remove("no-cursor");
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseover", mouseOverHandler);
      document.removeEventListener("mouseout", mouseOutHandler);
      document.removeEventListener("scroll", mouseOutHandler);
      window.removeEventListener("dialogopened", dialogOpenedHandler);
    } else {
      popoverRef.value?.showPopover();
      document.documentElement.classList.add("no-cursor");
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseover", mouseOverHandler);
      document.addEventListener("mouseout", mouseOutHandler);
      document.addEventListener("scroll", mouseOutHandler);
      window.addEventListener("dialogopened", dialogOpenedHandler);
    }
  },
  { immediate: true },
);

watch(
  showScrollbarSyncedRef,
  (showScrollbarSyncedRefValue) => {
    if (showScrollbarSyncedRefValue) {
      document.documentElement.classList.remove("no-scrollbar");
    } else {
      document.documentElement.classList.add("no-scrollbar");
    }
  },
  { immediate: true },
);
</script>

<template>
  <div ref="popoverRef" popover="manual" class="w-full h-full bg-transparent pointer-events-none">
    <div ref="cursorRef" :class="[
         'absolute w-[1rem] h-[1rem] z-[9999] -translate-1/2 bg-foreground/75 rounded-full opacity-0 pointer-events-none mix-blend-exclusion duration-500 transition-[background,opacity]',
         {'hidden': !cursorRef},
         {'bg-primary/50': isOverLink}
         ]">&nbsp;
    </div>
  </div>
</template>

<style>
html.no-cursor {
  * {
    cursor: none !important;
  }
}

html.no-scrollbar {
  scrollbar-width: none;
}
</style>
