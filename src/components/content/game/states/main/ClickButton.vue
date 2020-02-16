<!-- This component is for the button clicked to increase the player's score -->
<template>
    <button id="click-button" v-bind:class="[themeClass('game-button'), themeClass('text')]" v-on:click="addScore(getTotalGain())">Increase number by {{ formatSci(getTotalGain()) }}</button>
</template>

<script>
    import { gain, score, theme, upgrades } from "../../../../../mixins/storeIO.js";

    import calculatedValues from "../../../../../mixins/calculatedValues.js";
    import utils from "../../../../../mixins/utils.js";

    export default {
        mixins: [calculatedValues, score, theme, utils]
    };
</script>

<style scoped>
    #click-button {
        width: 22%;
        height: 35%;

        display: flex;

        justify-content: center;
        align-items: center;

        font-size: 100%;
    }
</style>
