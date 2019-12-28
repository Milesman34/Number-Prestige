Vue.component("theme-selector-list-button", {
    mixins: [utils],

    //currentTheme represents the game's current theme
    props: ["theme", "currentTheme"],

    methods: {
        //Returns the current theme class
        getThemeClass(elem) {
            return this.themeClass(elem, this.currentTheme);
        }
    },

    template: `
        <button class="theme-selector-list-button" v-bind:class="[getThemeClass('selector-item'), getThemeClass('selector-hover'), getThemeClass('text')]" v-on:click="$emit('set-theme', theme)">{{ capitalize(theme) }}</button>
    `
})
