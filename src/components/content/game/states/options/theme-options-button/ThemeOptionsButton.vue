<!-- Represents the button for changing themes -->
<template>
    <div class="options-button-container">
        <button id="theme-options-button" v-bind:class="[themeClass('game-button'), themeClass('text')]" @click="openSelector(selectorStates.theme)">
            <div id="theme-options-container">
                <div id="theme-options-text" v-bind:class="themeClass('text')">Theme</div>

                <current-theme-display-text></current-theme-display-text>
            </div>
        </button>
    </div>
</template>

<script>
    import CurrentThemeDisplayText from "./CurrentThemeDisplayText.vue";

    import { selectorStates } from "../../../../../../enums.js";

    import { selector, theme } from "../../../../../../mixins/storeIO.js";

    export default {
        mixins: [selector, theme],

        data: () => ({
            selectorStates
        }),

        components: {
            "current-theme-display-text": CurrentThemeDisplayText
        }
    };
</script>

<style scoped>
    #theme-options-button {
        width: 100%;
        height: 100%;

        grid-row: 2;
        grid-column: 2;

        display: grid;

        grid-template-rows: 25% auto 25%;
        grid-template-columns: 100%;

        user-select: none;
    }

    #theme-options-container {
        grid-row: 2;

        width: 100%;
        height: 100%;

        display: flex;

        flex-direction: column;
        justify-content: center;
    }

    #theme-options-text {
        font-size: 215%;

        display: flex;

        justify-content: center;
        align-items: center;
    }
</style>
