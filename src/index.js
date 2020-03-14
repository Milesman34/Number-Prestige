import Vue from "vue";

import App from "./components/App.vue";

import mixin from "./mixin.js";
import store from "./store.js";

// Makes the mixin global
Vue.mixin(mixin);

let app = new Vue({
    el: "#app",

    mixins: [mixin],

    store,

    components: {
        app: App
    },

    template: `<app></app>`
});
