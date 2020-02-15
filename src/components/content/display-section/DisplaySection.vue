<!-- This component represents the section used to display the player's score -->
<template>
    <div id="display-section">
        <number-display></number-display>
        <prestige-display></prestige-display>
    </div>
</template>

<script>
    import NumberDisplay from "./number-display/NumberDisplay.vue";
    import PrestigeDisplay from "./prestige-display/PrestigeDisplay.vue";

    export default {
        components: {
            "number-display": NumberDisplay,
            "prestige-display": PrestigeDisplay
        }
    };
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
