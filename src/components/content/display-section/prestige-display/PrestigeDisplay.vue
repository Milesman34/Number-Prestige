<!-- This component contains the prestige points display and the prestige button -->
<template>
    <div id="prestige-display">
        <prestige-point-display v-if="hasPrestiged()"></prestige-point-display>

        <div id="prestige-button-container">
            <prestige-button v-if="canPrestige()"></prestige-button>
        </div>
    </div>
</template>

<script>
    import PrestigeButton from "./PrestigeButton.vue";
    import PrestigePointDisplay from "./PrestigePointDisplay.vue";

    import { prestiges, score } from "../../../../mixins/storeIO.js";

    import calculatedValues from "../../../../mixins/calculatedValues.js";

    export default {
        mixins: [calculatedValues, prestiges, score],

        components: {
            "prestige-button": PrestigeButton,
            "prestige-point-display": PrestigePointDisplay
        },

        methods: {
            // Determines if the player can prestige
            canPrestige() {
                return this.getScore() >= this.getActualGoal();
            }
        }
    };
</script>

<style scoped>
    #prestige-display {
        width: 100%;
        height: 100%;

        grid-column: 3;

        display: grid;
    }

    #prestige-button-container {
    	width: 100%;
    	height: 100%;

    	grid-row: 2;

    	display: flex;

        justify-content: center;
        align-items: center;
    }
</style>
