import Vue from "vue";

import App from "./components/App.vue";

import gameStates from "./enums/gameStates.js";
import themes from "./enums/themes.js";

import gameState from "./mixins/store/gameState.js";
import theme from "./mixins/store/theme.js";

import store from "./store.js";

//Exposes enums
window.gameStates = gameStates;
window.themes = themes;

let app = new Vue({
    el: "#app",

    store,

    components: {
        app: App
    },

    template: `<app></app>`
});
