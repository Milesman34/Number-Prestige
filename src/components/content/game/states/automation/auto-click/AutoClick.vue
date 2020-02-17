<!-- This component represents the auto-click element -->
<template>
    <div id="autoclick">
        <div id="autoclick-toggle-bar">
            <auto-click-toggle-button></auto-click-toggle-button>
        </div>

        <div id="autoclick-speed-text-container">
            <auto-click-speed-text></auto-click-speed-text>
        </div>
    </div>
</template>

<script>
    import AutoClickToggleButton from "./AutoClickToggleButton.vue";

    import AutoClickSpeedText from "./auto-click-speed-text/AutoClickSpeedText.vue";

    export default {
        components: {
            "auto-click-speed-text": AutoClickSpeedText,
            "auto-click-toggle-button": AutoClickToggleButton
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
