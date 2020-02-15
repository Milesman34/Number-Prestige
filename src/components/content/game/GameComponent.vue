<!-- This component represents the area that contains the game's UI, based on the current gameState -->
<template>
    <div id="game-component">
        <main-state v-if="getGameState() === gameStates.main"></main-state>
        <options-state v-if="getGameState() === gameStates.options"></options-state>
    </div>
</template>

<script>
    import MainState from "./states/main/MainState.vue";
    import OptionsState from "./states/options/OptionsState.vue";

    import { gameStates } from "../../../enums.js";

    import { gameState } from "../../../mixins/storeIO.js";

    export default {
        mixins: [gameState],

        data: () => ({
            gameStates
        }),

        components: {
            "main-state": MainState,
            "options-state": OptionsState
        }
    };
</script>

<style scoped>
    #game-component {
        width: 100%;
        height: 100%;

        display: grid;

        grid-template-rows: 100%;
        grid-template-columns: 100%;
    }
</style>
