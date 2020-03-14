<!-- This component displays the score -->
<template>
    <div id="score-display" v-bind:class="themeClass('text')">{{ formatSci(Math.floor(getScore())) }}</div>
</template>

<script>
    export default {};
</script>

<style scoped>
    #score-display {
        display: flex;

        justify-content: center;
        align-items: center;

        font-size: 200%;
    }
</style>
