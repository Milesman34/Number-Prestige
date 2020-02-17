<!-- This component displays the score -->
<template>
    <div id="score-display" v-bind:class="themeClass('text')">{{ formatSci(Math.floor(getScore())) }}</div>
</template>

<script>
    import { score, theme } from "../../../../mixins/storeIO.js";

    import utils from "../../../../mixins/utils.js";

    export default {
        mixins: [score, theme, utils]
    };
</script>

<style scoped>
    #score-display {
        display: flex;

        justify-content: center;
        align-items: center;

        font-size: 200%;
    }
</style>
