Vue.component("notification", {
    mixins: [utils, storeIO],

    props: ["title", "condition"],

    template: `
        <div class="notification" v-bind:class="[getThemeClass('notification'), condition ? 'notification-on' : 'notification-off']">{{ title }}</div>`
});
