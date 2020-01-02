Vue.component("header-item", {
    mixins: [utils, storeIO],

    props: ["selfState"],

    template: `<button class="header-item" v-bind:class="[getThemeClass('header-item'), getThemeClass('text')]" v-on:click="$emit('set-state', selfState)">{{ capitalize(selfState) }}</button>`
})
