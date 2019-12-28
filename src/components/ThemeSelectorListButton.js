Vue.component("theme-selector-list-button", {
    props: ["theme", "themeClass"],

    mixins: [utils],

    template: `
        <button class="theme-selector-list-button" v-bind:class="themeClass('selector-item', 'selector-hover', 'text')" v-on:click="$emit('set-theme', theme)">{{ capitalize(theme) }}</button>
    `
})
