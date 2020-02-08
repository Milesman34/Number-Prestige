Vue.component("notification", {
    mixins: [utils, storeIO],

    props: ["title"],

    template: `
        <div class="notification" v-bind:class="[getThemeClass('notification'), 'notification-on']">{{ title }}</div>`
});
