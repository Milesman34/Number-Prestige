<!-- This component containers any selectors -->
<template>
    <div id="selector-container">
        <theme-selector v-if="getSelector() === enums.selectorStates.theme"></theme-selector>
    </div>
</template>

<script>
    import ThemeSelector from "./theme-selector/ThemeSelector.vue";

    export default {
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
