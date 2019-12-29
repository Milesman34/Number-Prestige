Vue.component("header-item", {
    mixins: [utils, themeClassComponents],

    props: ["state", "view", "prestiges", "currentTheme"],

    template: `<button class="header-item" v-bind:class="[getThemeClass('header-item'), getThemeClass('text')]" v-on:click="$emit('set-state', state)" v-if="view()">{{ capitalize(state) }}</button>`
})
