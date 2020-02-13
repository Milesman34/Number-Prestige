<!-- This component allows the player to exit the theme selector -->
<template>
    <button id="theme-selector-exit-button" v-bind:class="[themeClass('selector-item'), themeClass('text'), themeClass('selector-hover')]" @click="closeSelector()">Exit</button>
</template>

<script>
    import { selector, theme } from "../../../mixins/storeIO.js";

    export default {
        mixins: [selector, theme]
    };
</script>

<style scoped>
    #theme-selector-exit-button {
        width: 100%;

        display: flex;

        justify-content: center;
        align-items: center;
    }
</style>
