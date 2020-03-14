<!-- This component allows the player to exit the theme selector -->
<template>
    <button id="theme-selector-exit-button" v-bind:class="[themeClass('selector-hover'), themeClass('selector-item'), themeClass('text')]" @click="closeSelector()">Exit</button>
</template>

<script>
    export default {};
</script>

<style scoped>
    #theme-selector-exit-button {
        width: 100%;

        display: flex;

        justify-content: center;
        align-items: center;
    }
</style>
