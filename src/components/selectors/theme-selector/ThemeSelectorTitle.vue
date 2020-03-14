<!-- This component represents the title of the theme selector -->
<template>
    <div id="theme-selector-title" v-bind:class="[themeClass('selector-item'), themeClass('text')]">Select Theme</div>
</template>

<script>
    export default {};
</script>

<style scoped>
    #theme-selector-title {
        width: 100%;

        display: flex;

        justify-content: center;
        align-items: center;
    }
</style>
