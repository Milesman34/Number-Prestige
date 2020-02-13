<!-- This component represents the options tab of the game -->
<template>
    <div id="options">
        <div class="options-row">
            <options-button title="Save" v-bind:func="() => 3"></options-button>
            <options-button title="Reset" v-bind:func="() => 4"></options-button>
        </div>
    </div>
</template>

<script>
    import OptionsButton from "./OptionsButton.vue";

    export default {
        components: {
            "options-button": OptionsButton
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
