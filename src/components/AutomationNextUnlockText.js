Vue.component("automation-next-unlock-text", {
    mixins: [themeClassComponents],

    props: ["text", "condition", "autoClickUnlocked", "autoPrestigeUnlocked", "currentTheme"],

    template: `<div class="automation-next-unlock-text sans" v-bind:class="getThemeClass('text')" v-if="condition()">{{ text }}</div>`
})
