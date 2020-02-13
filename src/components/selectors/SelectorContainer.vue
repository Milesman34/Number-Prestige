<!-- This component containers any selectors -->
<template>
    <div id="selector-container">
        <theme-selector v-if="getSelector() === selectorStates.theme"></theme-selector>
    </div>
</template>

<script>
    import ThemeSelector from "./theme-selector/ThemeSelector.vue";

    import { selectorStates } from "../../enums.js";

    import { selector } from "../../mixins/storeIO.js";

    export default {
        mixins: [selector],

        data: () => ({
            selectorStates
        }),

        components: {
            "theme-selector": ThemeSelector
        }
    };
</script>

<style scoped>
    #selector-container {
        grid-row: 1;
        grid-column: 1;

        display: grid;

        grid-template-rows: auto;
        grid-template-columns: auto;
    }
</style>
