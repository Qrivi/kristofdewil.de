<template>
    <div @click="toggleMenu">x</div>
</template>

<script>
export default {
    methods: {
        toggleMenu() {
            document.body.classList.toggle('withmenu')
        },
    },
}
</script>

<style lang="scss" scoped></style>
