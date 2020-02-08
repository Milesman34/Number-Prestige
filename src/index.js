import Vue from "vue";

import App from "./components/App.vue";

let app = new Vue({
    el: "#app",

    components: {
        app: App
    },

    template: `<app></app>`
});
