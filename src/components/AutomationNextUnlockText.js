Vue.component("automation-next-unlock-text", {
    mixins: [themeClassComponents],

    props: ["text", "condition", "autoClickUnlocked", "autoPrestigeUnlocked"],

    computed: {
        currentTheme() {
            return this.$store.state.theme;
        }
    },

    template: `<div class="automation-next-unlock-text sans" v-bind:class="getThemeClass('text')" v-if="condition()">{{ text }}</div>`
})
