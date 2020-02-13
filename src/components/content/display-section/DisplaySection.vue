<!-- This component represents the section used to display the player's score -->
<template>
    <div id="display-section">
    </div>
</template>

<script>
    export default {};
</script>

<style scoped>
    #display-section {
        width: 100%;
        height: 100%;

        display: grid;

        grid-template-rows: 100%;
        grid-template-columns: 30% 40% 30%;
    }
</style>
