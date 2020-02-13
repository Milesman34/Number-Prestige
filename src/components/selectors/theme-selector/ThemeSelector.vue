<!-- This component represents the selector for themes -->
<template>
    <div id="theme-selector-container">
        <div id="theme-selector" v-bind:class="themeClass('theme-selector')">
            <div id="theme-selector-title" v-bind:class="[themeClass('selector-item'), themeClass('text')]">Select Theme</div>

            <div id="theme-selector-list">
                <theme-selector-list-button theme="light"></theme-selector-list-button>
                <theme-selector-list-button theme="dark"></theme-selector-list-button>
                <theme-selector-list-button theme="gradient"></theme-selector-list-button>
            </div>

            <theme-selector-exit-button></theme-selector-exit-button>
        </div>
    </div>
</template>

<script>
    import ThemeSelectorExitButton from "./ThemeSelectorExitButton.vue";
    import ThemeSelectorListButton from "./ThemeSelectorListButton.vue";

    import { theme } from "../../../mixins/storeIO.js";

    export default {
        mixins: [theme],

        components: {
            "theme-selector-exit-button": ThemeSelectorExitButton,
            "theme-selector-list-button": ThemeSelectorListButton
        }
    };
</script>

<style scoped>
    #theme-selector-container {
        grid-row: 1;
        grid-column: 1;

        display: grid;

        grid-template-rows: 30% auto 30%;
        grid-template-columns: 45% auto 45%;
    }

    #theme-selector {
        position: relative;

        grid-row: 2;
        grid-column: 2;

        display: grid;

        grid-template-rows: 10% auto 10%;
        grid-template-columns: auto;

        user-select: none;
    }

    #theme-selector-title {
        width: 100%;

        display: flex;

        justify-content: center;
        align-items: center;
    }

    #theme-selector-list {
        display: flex;

        flex-direction: column;
    }

    /* Theme selector themes */
    .theme-selector-dark {
        color: rgb(255, 255, 255);

        background-color: rgb(36, 36, 36);

        box-shadow: 2px 2px 2px black;
    }

    .theme-selector-light {
        color: rgb(0, 0, 0);

        background-color: rgb(195, 195, 195);

        box-shadow: 2px 2px 2px rgb(180, 180, 180);
    }

    .theme-selector-gradient {
        color: rgb(255, 255, 255);

        background-image: linear-gradient(rgb(36, 36, 36), rgb(61, 61, 61));

        border: 2px 2px 2px 2px solid rgb(195, 195, 195);
    }
</style>

<style>
    /* Selector hover themes */
    .selector-hover-dark:hover {
        background-color: rgb(44, 44, 44);
    }

    .selector-hover-light:hover {
        background-color: rgb(215, 215, 215);
    }

    .selector-hover-gradient:hover {
        background-image: linear-gradient(rgb(56, 56, 56), rgb(81, 81, 81));
    }

    /* Selector item themes */
    .selector-item-dark {
        color: rgb(255, 255, 255);

        border-bottom: solid black 2px;
    }

    .selector-item-light {
        color: rgb(0, 0, 0);

        border-bottom: solid rgb(180, 180, 180) 2px;
    }

    .selector-item-gradient {
        color: rgb(255, 255, 255);

        border: 2px solid rgb(195, 195, 195);
    }
</style>
