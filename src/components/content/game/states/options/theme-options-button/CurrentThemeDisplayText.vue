<!-- This component displays the current theme -->
<template>
    <div id="theme-options-current" v-bind:class="themeClass('text')">Currently: {{ capitalize(getTheme()) }}</div>
</template>

<script>
    export default {};
</script>

<style scoped>
    #theme-options-current {
        font-size: 95%;

        display: flex;

        justify-content: center;
        align-items: center;
    }
</style>
