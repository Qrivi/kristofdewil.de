<script setup lang="ts">
import { onMounted, ref } from "vue";
import Search from "./icons/Search.vue";

const activeLink = ref<HTMLAnchorElement | undefined>(undefined); // holds the anchor that is linking to the current page
const defaultOffset = ref(0); // calculated x position of the dot when only CSS left is applied
const extraOffset = ref(0); // calculated x delta to translate the dot with for it to appear under a link
const shouldAnimate = ref(false);

const wrapper = ref<HTMLElement | null>(null);
const dot = ref<HTMLElement | null>(null);

onMounted(() => {
  wrapper.value!.querySelectorAll("a").forEach((link) => {
    if (location.pathname.startsWith(link.getAttribute("href")!)) {
      activeLink.value = link;
    }
  });

  defaultOffset.value = parseFloat(getComputedStyle(document.documentElement).fontSize) * 6.3; // rem to px
  moveDot(activeLink.value!);

  setTimeout(() => {
    shouldAnimate.value = true;
  }, 10); // Prevent transition on page load
});

function openSearch() {
  document.body.classList.add("search");
}

function moveDot(target: HTMLAnchorElement) {
  if (dot.value) {
    if (target.getAttribute("href") === "/") {
      extraOffset.value = 0;
    } else {
      const targetCenter = target.offsetLeft + target.offsetWidth / 2;
      const dotCenter = dot.value.offsetWidth / 2;
      extraOffset.value = targetCenter - dotCenter - defaultOffset.value;
    }
  }
}

function mouseEnter(e: MouseEvent) {
  if (e.target instanceof HTMLAnchorElement) {
    moveDot(e.target);
  }
}

function mouseLeave() {
  if (activeLink.value instanceof HTMLAnchorElement) {
    moveDot(activeLink.value);
  }
}
</script>

<template>
  <div class="wrapper" ref="wrapper" @mouseover="mouseEnter" @mouseleave="mouseLeave">
    <slot />
    <nav>
      <ul>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/curriculum">Resume</a></li>
      </ul>
    </nav>
    <button class="clickable search" title="Search" @click="openSearch">
      <Search />
    </button>
    <div
      class="dot"
      ref="dot"
      :class="{ animated: shouldAnimate }"
      :style="{ transform: `translateX(${defaultOffset + extraOffset}px)` }"
    >
      .
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  column-gap: 4rem;
  position: relative;

  .search {
    margin-left: auto;
  }

  .dot {
    color: var(--color-accent);
    font-size: 4.2rem;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    bottom: 0.4rem;
    left: 0;
    transform: translateX(6.3rem);

    &.animated {
      opacity: 1;
      transition: transform 250ms ease-in;
    }
  }
}

nav ul {
  column-gap: 2rem;
  display: flex;
  font-weight: 600;
  list-style-type: none;
  padding: 0;

  a {
    padding: 0.5rem;
  }
}
</style>
