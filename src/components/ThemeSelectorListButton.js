Vue.component("theme-selector-list-button", {
    mixins: [utils, themeClassComponents],

    //currentTheme represents the game's current theme
    props: ["theme"],

    computed: {
        currentTheme() {
            return this.$store.state.theme;
        }
    },

    template: `
        <button
            class="theme-selector-list-button"
            v-bind:class="[getThemeClass('selector-item'), getThemeClass('selector-hover'), getThemeClass('text')]"
            @click="$store.commit('setTheme', theme)">{{ capitalize(theme) }}</button>
    `
})
