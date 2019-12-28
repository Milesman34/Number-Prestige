Vue.component("theme-selector-list-button", {
    //currentTheme represents the game's current theme
    props: ["theme", "currentTheme"],

    mixins: [utils],

    template: `
        <button class="theme-selector-list-button" v-bind:class="[themeClass('selector-item', currentTheme), themeClass('selector-hover', currentTheme), themeClass('text', currentTheme)]" v-on:click="$emit('set-theme', theme)">{{ capitalize(theme) }}</button>
    `
})
