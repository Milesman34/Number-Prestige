<!-- This component is for the button clicked to increase the player's score -->
<template>
    <button id="click-button" v-bind:class="[themeClass('game-button'), themeClass('text')]" v-on:click="addScore(getGain())">Increase number by {{ formatSci(getGain()) }}</button>
</template>

<script>
    import { gain, score, theme } from "../../../../../mixins/storeIO.js";

    import utils from "../../../../../mixins/utils.js";

    export default {
        mixins: [gain, score, theme, utils]
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
