<!-- This button toggles auto-click -->
<template>
    <button id="autoclick-toggle-button" v-bind:class="[themeClass('text'), themeClass('game-button')]" v-on:click="toggleAutoClick">Auto-Click: {{ isAutoClickEnabled() ? "On" : "Off" }}</button>
</template>

<script>
    import { autoClick, theme } from "../../../../../../mixins/storeIO.js";

    export default {
        mixins: [autoClick, theme]
    };
</script>

<style scoped>
    #autoclick-toggle-button {
        user-select: none;
        padding: 5px;
    }
</style>
