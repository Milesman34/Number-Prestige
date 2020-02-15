<!-- This component displays how many prestige points the player has -->
<template>
    <div id="prestige-point-display" v-bind:class="themeClass('text')">You have {{ formatSci(getPrestigePoints()) }} Prestige Point{{ pluralEnding(getPrestigePoints()) }}</div>
</template>

<script>
    import { prestigePoints, theme } from "../../../../mixins/storeIO.js";

    import utils from "../../../../mixins/utils.js";

    export default {
        mixins: [prestigePoints, theme, utils]
    };
</script>

<style scoped>
    #prestige-point-display {
        width: 100%;
        height: 100%;

        grid-row: 1;

        display: flex;

        justify-content: center;
        align-items: center;

        font-size: 72%;
    }
</style>
