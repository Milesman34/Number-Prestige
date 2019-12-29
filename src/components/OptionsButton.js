Vue.component("options-button", {
    mixins: [themeClassComponents],

    props: ["title", "currentTheme"],

    template: `<div class="options-button-container">
        <button class="options-button" v-bind:class="[getThemeClass('game-button'), getThemeClass('text')]" v-on:click="$emit('event')">
            {{ title }}
        </button>
    </div>`
});
