import Vue from "vue";

import App from "./components/App.vue";

import { gameStates, selectorStates, themes } from "./enums.js";

import store from "./store.js";

// Exposes enums
window.gameStates = gameStates;
window.selectorStates = selectorStates;
window.themes = themes;

let app = new Vue({
    el: "#app",

    store,

    components: {
        app: App
    },

    template: `<app></app>`
});
