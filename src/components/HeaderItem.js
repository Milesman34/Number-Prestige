Vue.component("header-item", {
    mixins: [utils, themeClassComponents],

    props: ["state"],

    computed: {
        currentTheme() {
            return this.$root.theme;
        }
    },

    template: `<button class="header-item" v-bind:class="[getThemeClass('header-item'), getThemeClass('text')]" v-on:click="$emit('event', state)">{{ capitalize(state) }}</button>`
})
