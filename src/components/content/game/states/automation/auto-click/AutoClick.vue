<!-- This component represents the auto-click element -->
<template>
    <div id="autoclick">
        <div id="autoclick-toggle-bar">
            <automation-toggle-button text="Auto-Click" v-bind:func="toggleAutoClick" v-bind:condition="isAutoClickEnabled"></automation-toggle-button>
        </div>

        <div id="autoclick-speed-text-container">
            <auto-click-speed-text></auto-click-speed-text>
        </div>
    </div>
</template>

<script>
    import AutomationToggleButton from "../AutomationToggleButton.vue";

    import AutoClickSpeedText from "./auto-click-speed-text/AutoClickSpeedText.vue";

    import { autoClick } from "../../../../../../mixins/storeIO.js";

    export default {
        mixins: [autoClick],

        components: {
            "automation-toggle-button": AutomationToggleButton,
            "auto-click-speed-text": AutoClickSpeedText
        }
    };
</script>

<style scoped>
    #autoclick {
        width: 100%;
        height: 100%;

        display: grid;

        grid-template-rows: 50% 50%;
    }

    #autoclick-toggle-bar {
    	width: 100%;

    	display: flex;

    	justify-content: center;
        align-items: center;
    }

    #autoclick-speed-text-container {
    	display: flex;

    	justify-content: center;
        align-items: center;
    }
</style>
