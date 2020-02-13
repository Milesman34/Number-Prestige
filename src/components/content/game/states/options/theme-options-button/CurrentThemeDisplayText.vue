<!-- This component displays the current theme -->
<template>
    <div id="theme-options-current" v-bind:class="themeClass('text')">Currently: {{ capitalize(getTheme()) }}</div>
</template>

<script>
    import { theme } from "../../../../../../mixins/storeIO.js";
    import utils from "../../../../../../mixins/utils.js";

    export default {
        mixins: [theme, utils]
    };
</script>

<style scoped>
    #theme-options-current {
        font-size: 95%;

        display: flex;

        justify-content: center;
        align-items: center;
    }
</style>
