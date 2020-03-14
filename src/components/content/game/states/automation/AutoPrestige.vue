<!-- This component represents the auto-prestige element -->
<template>
    <div id="autoprestige-toggle-bar">
        <automation-toggle-button text="Auto-Prestige" v-bind:func="() => toggleAutomationElement(enums.automationElements.prestige)" v-bind:condition="isAutoPrestigeEnabled"></automation-toggle-button>
    </div>
</template>

<script>
    import AutomationToggleButton from "./AutomationToggleButton.vue";

    export default {
        components: {
            "automation-toggle-button": AutomationToggleButton
        }
    };
</script>

<style scoped>
    #autoprestige-toggle-bar {
    	width: 100%;

    	display: flex;

    	justify-content: center;
        align-items: center;
    }
</style>
