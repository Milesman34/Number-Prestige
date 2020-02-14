<!-- This component represents the options tab of the game -->
<template>
    <div id="options">
        <div class="options-row">
            <theme-options-button></theme-options-button>
            <options-button title="Save" v-bind:func="save"></options-button>
            <options-button title="Load" v-bind:func="loadSaveData"></options-button>
            <options-button title="Reset" v-bind:func="() => confirmReset() && resetSave()"></options-button>
        </div>
    </div>
</template>

<script>
    import OptionsButton from "./OptionsButton.vue";
    import ThemeOptionsButton from "./theme-options-button/ThemeOptionsButton.vue";

    import save from "../../../../../mixins/save.js";

    export default {
        mixins: [save],

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
