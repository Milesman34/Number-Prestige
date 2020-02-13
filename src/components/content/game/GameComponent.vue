<!-- This component represents the area that contains the game's UI, based on the current gameState -->
<template>
    <div id="game-section"></div>
</template>

<script>
    export default {};
</script>

<style scoped>
    #game-section {
        width: 100%;
        height: 100%;

        display: grid;

        grid-template-rows: 100%;
        grid-template-columns: 100%;
    }
</style>
