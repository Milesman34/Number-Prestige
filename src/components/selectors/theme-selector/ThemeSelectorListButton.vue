<!-- Represents a button that can be used to select a list -->
<template>
    <button
        class="theme-selector-list-button"
        v-bind:class="[themeClass('selector-item'), themeClass('selector-hover'), themeClass('text')]"
        @click="setTheme(theme)">{{ capitalize(theme) }}
    </button>
</template>

<script>
    import { theme } from "../../../mixins/storeIO.js";

    import utils from "../../../mixins/utils.js";

    export default {
        mixins: [theme, utils],

        props: ["theme"]
    };
</script>

<style scoped>
    .theme-selector-list-button {
        width: 100%;
        height: 50%;

        display: flex;

        justify-content: center;
        align-items: center;

        font-size: 155%;
    }
</style>
