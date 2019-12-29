Vue.component("theme-selector-list-button", {
    mixins: [utils, themeClassComponents],

    //currentTheme represents the game's current theme
    props: ["theme", "currentTheme"],

    template: `
        <button class="theme-selector-list-button" v-bind:class="[getThemeClass('selector-item'), getThemeClass('selector-hover'), getThemeClass('text')]" v-on:click="$emit('set-theme', theme)">{{ capitalize(theme) }}</button>
    `
})
