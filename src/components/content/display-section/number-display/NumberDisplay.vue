<!-- This component represents the section where the number is displayed -->
<template>
    <div id="number-display">
        <score-display></score-display>
        <goal-display></goal-display>
    </div>
</template>

<script>
    import GoalDisplay from "./GoalDisplay.vue";
    import ScoreDisplay from "./ScoreDisplay.vue";

    export default {
        components: {
            "goal-display": GoalDisplay,
            "score-display": ScoreDisplay
        }
    };
</script>

<style scoped>
    #number-display {
        width: 100%;
        height: 100%;

        grid-column: 2;

        display: grid;

        grid-template-rows: 75% 25%;
        grid-template-columns: 100%;
    }
</style>
