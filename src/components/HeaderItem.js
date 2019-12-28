Vue.component("header-item", {
    mixins: [utils],

    props: ["state", "view", "prestiges", "currentTheme"],

    methods: {
        //Returns the current theme class
        getThemeClass(elem) {
            return this.themeClass(elem, this.currentTheme);
        }
    },

    template: `<button class="header-item" v-bind:class="[getThemeClass('header-item'), getThemeClass('text')]" v-on:click="$emit('set-state', state)" v-if="view()">{{ capitalize(state) }}</button>`
})
