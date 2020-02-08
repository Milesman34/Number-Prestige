Vue.component("theme-selector-list-button", {
    mixins: [utils, storeIO],

    //currentTheme represents the game's current theme
    props: ["self-theme"],

    template: `
        <button
            class="theme-selector-list-button"
            v-bind:class="[getThemeClass('selector-item'), getThemeClass('selector-hover'), getThemeClass('text')]"
            @click="setTheme(selfTheme)">{{ capitalize(selfTheme) }}</button>
    `
});
