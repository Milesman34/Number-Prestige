<!-- This component represents the options tab of the game -->
<template>
    <div id="options">
        <div class="options-row">
            <theme-options-button></theme-options-button>
            <options-button title="Save" v-bind:func="manualSave"></options-button>
            <options-button title="Load" v-bind:func="manualLoad"></options-button>
            <options-button title="Reset" v-bind:func="() => confirmReset() && resetSave()"></options-button>
        </div>
    </div>
</template>

<script>
    import OptionsButton from "./OptionsButton.vue";
    import ThemeOptionsButton from "./theme-options-button/ThemeOptionsButton.vue";

    import { notifications}  from "../../../../../mixins/storeIO.js";

    import save from "../../../../../mixins/save.js";

    export default {
        mixins: [notifications, save],

        methods: {
            // These functions also push notifications to the screen
            // Manually saves the game
            manualSave() {
                this.save();

                this.pushNotification("Game Saved");
            },

            // Manually loads the game's save data
            manualLoad() {
                this.loadSaveData();

                this.pushNotification("Save Loaded");
            }
        },

        components: {
            "options-button": OptionsButton,
            "theme-options-button": ThemeOptionsButton
        }
    };
</script>

<style scoped>
    #options {
        grid-row: 1;
        grid-column: 1;

        display: grid;

        grid-template-rows: repeat(4, auto);
    }

    .options-row {
        width: 100%;

        display: grid;

        grid-template-columns: repeat(4, 25%);
    }
</style>
