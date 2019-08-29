<template>
  <div role="application">
    <AppHeader />
    <main>
      <SectionActivity />
    </main>
  </div>
</template>

<script>
import AppHeader from './segments/AppHeader.vue';
import SectionActivity from './segments/SectionActivity.vue';

export default {
  components: {
    AppHeader,
    SectionActivity,
  },
};
</script>

<style lang="scss">
main{
 margin: 20px auto;
}
</style>
