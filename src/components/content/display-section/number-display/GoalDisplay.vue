<!-- This component displays the goal -->
<template>
    <div id="goal-display" v-bind:class="themeClass('text')">Goal: {{ formatSci(getActualGoal()) }}</div>
</template>

<script>
    import { theme } from "../../../../mixins/storeIO.js";

    import calculatedValues from "../../../../mixins/calculatedValues.js";
    import utils from "../../../../mixins/utils.js";

    export default {
        mixins: [calculatedValues, theme, utils]
    };
</script>

<style scoped>
    #goal-display {
        display: flex;

        justify-content: center;
        align-items: center;

        font-size: 75%;
    }
</style>
