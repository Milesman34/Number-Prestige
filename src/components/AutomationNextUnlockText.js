Vue.component("automation-next-unlock-text", {
    mixins: [utils, storeIO],

    props: ["text", "condition", "autoClickUnlocked", "autoPrestigeUnlocked"],

    template: `<div class="automation-next-unlock-text sans" v-bind:class="getThemeClass('text')" v-if="condition()">{{ text }}</div>`
})
