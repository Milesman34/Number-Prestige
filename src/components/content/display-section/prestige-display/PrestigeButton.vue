<!-- This component represents the button for prestiging -->
<template>
    <button id="prestige-button" @click="prestige()" v-bind:class="[themeClass('game-button'), themeClass('text')]">Prestige for 1 Prestige Point</button>
</template>

<script>
    import { gain, goal, prestigePoints, prestiges, score, theme } from "../../../../mixins/storeIO.js";

    export default {
        mixins: [gain, goal, prestigePoints, prestiges, score, theme],

        methods: {
            // Prestiges the game, resetting the player's score but increasing their number gain by 1 and doubling their goal
            prestige() {
                // Gives the player a warning if it is their first prestige
                if (!this.hasPrestiged() && !confirm(
                    "Are you sure you want to prestige? This will reset your score, while adding 1 to your number gain and doubling the goal. You will also receive a Prestige point."
                )) return;

                // Resets the score
                this.resetScore();

                // Updates the number gain and prestige goal
                this.increaseGain();
                this.increaseGoal();

                // Gives the player the required number of prestige points and a prestiged stat
                this.addPrestigePoints(1);
                this.increasePrestiges();
            }
        }
    };
</script>

<style scoped>
    #prestige-button {
        width: 55%;
        height: 100%;

        display: flex;

        justify-content: center;
        align-items: center;

        font-size: 92.5%;

        text-align: center;

        user-select: none;
    }
</style>
