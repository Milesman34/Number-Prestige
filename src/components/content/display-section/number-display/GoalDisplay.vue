<!-- This component displays the goal -->
<template>
    <div id="goal-display" v-bind:class="themeClass('text')">Goal: {{ formatSci(getActualGoal()) }}</div>
</template>

<script>
    export default {};
</script>

<style scoped>
    #goal-display {
        display: flex;

        justify-content: center;
        align-items: center;

        font-size: 75%;
    }
</style>
