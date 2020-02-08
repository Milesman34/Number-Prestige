Vue.component("automation-next-unlock-text", {
    mixins: [utils, storeIO],

    props: ["text"],

    template: `<div class="automation-next-unlock-text sans" v-bind:class="getThemeClass('text')" >{{ text }}</div>`
});
