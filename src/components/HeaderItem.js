Vue.component("header-item", {
    mixins: [utils, storeIO],

    props: ["state"],

    template: `<button class="header-item" v-bind:class="[getThemeClass('header-item'), getThemeClass('text')]" v-on:click="setState(state)">{{ capitalize(state) }}</button>`
})
