import Vue from "vue";

import App from "./components/App.vue";

import store from "./store.js";

let app = new Vue({
    el: "#app",

    store,

    components: {
        app: App
    },

    template: `<app></app>`
});
