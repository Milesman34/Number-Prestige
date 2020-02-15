<!-- This component displays the goal -->
<template>
    <div id="goal-display" v-bind:class="themeClass('text')">Goal: {{ formatSci(getGoal()) }}</div>
</template>

<script>
    import { goal, theme } from "../../../../mixins/storeIO.js";

    import utils from "../../../../mixins/utils.js";

    export default {
        mixins: [goal, theme, utils]
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
