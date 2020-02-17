<!-- This component represents the area that contains the game's UI, based on the current gameState -->
<template>
    <div id="game-component">
        <main-state v-if="getGameState() === gameStates.main"></main-state>
        <options-state v-if="getGameState() === gameStates.options"></options-state>
        <upgrades-state v-if="getGameState() === gameStates.upgrades"></upgrades-state>
        <automation-state v-if="getGameState() === gameStates.automation"></automation-state>
    </div>
</template>

<script>
    import AutomationState from "./states/automation/AutomationState.vue";
    import MainState from "./states/main/MainState.vue";
    import OptionsState from "./states/options/OptionsState.vue";
    import UpgradesState from "./states/upgrades/UpgradesState.vue";

    import { gameStates } from "../../../enums.js";

    import { gameState } from "../../../mixins/storeIO.js";

    export default {
        mixins: [gameState],

        data: () => ({
            gameStates
        }),

        components: {
            "automation-state": AutomationState,
            "main-state": MainState,
            "options-state": OptionsState,
            "upgrades-state": UpgradesState
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
