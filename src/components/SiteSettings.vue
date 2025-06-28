<script setup lang="ts">
import { WrenchIcon } from "lucide-vue-next";
import { computed, ref } from "vue";
import { useSyncedRef } from "../composables/useSyncedRef";

const dialogRef = ref<HTMLDialogElement | null>(null);
const showCursorRef = useSyncedRef("showCursor", false);
const showScrollbarRef = useSyncedRef("showScrollbar", false);
// biome-ignore lint/style/noNonNullAssertion: Implicit assertion left side of the &&.
const forceAppearanceRef = ref(localStorage.getItem("theme") && JSON.parse(localStorage.getItem("theme")!));

const openDialog = () => {
  dialogRef.value?.showModal();
  window.dispatchEvent(new CustomEvent("dialogopened"));
};

const dialogMouseUpHandler = (e: MouseEvent) => {
  // TODO Replace with closedby="any" attribute when Safari supports it
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby
  if (e.target === dialogRef.value) {
    dialogRef.value?.close();
  }
};

const updateColorTheme = (theme: "dark" | "light" | "system") => {
  forceAppearanceRef.value = theme;
  localStorage.setItem("theme", JSON.stringify(theme));
  // biome-ignore lint/suspicious/noExplicitAny: Added to the window in DocumentHead.astro
  (window as any).loadColorTheme();
};

const forcedDark = computed({
  get: () => forceAppearanceRef.value === "dark",
  set: (val) => updateColorTheme(val ? "dark" : "system"),
});

const forceLight = computed({
  get: () => forceAppearanceRef.value === "light",
  set: (val) => updateColorTheme(val ? "light" : "system"),
});
</script>

<template>
  <button @click="openDialog">
    <WrenchIcon :size="16"/>
  </button>

  <dialog ref="dialogRef" @mouseup="dialogMouseUpHandler" class="m-auto w-[90%] max-w-[520px] h-fit shadow-2xl backdrop:bg-neutral-600/30 backdrop:backdrop-blur-xs">
    <div class="w-full p-8 bg-background text-foreground">
      <h2 class="title-section">Accessibility</h2>
      <form class="grid sm:grid-cols-2 gap-x-10 gap-y-4 w-full">
        <label class="component-switch sm:order-1">
          <input type="checkbox" name="showCursor" v-model="showCursorRef"/> Show Cursor
        </label>
        <label class="component-switch sm:order-3">
          <input type="checkbox" name="showScrollbar" v-model="showScrollbarRef"/> Show Scrollbar
        </label>
        <label class="component-switch sm:order-2">
          <input type="checkbox" name="forceAppearance" v-model="forceLight"/> Force Light Mode
        </label>
        <label class="component-switch sm:order-4">
          <input type="checkbox" name="forceAppearance" v-model="forcedDark"/> Force Dark Mode
        </label>
      </form>
    </div>
  </dialog>
</template>
