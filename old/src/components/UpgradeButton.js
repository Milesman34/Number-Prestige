Vue.component("upgrade-button", {
    mixins: [utils, storeIO],

    props: [
        "description",
        "formatFunction",
        "boost",
        "cost",
        "affordable"
    ],

    template: `<div class="prestige-upgrade-container">
        <button class="prestige-upgrade-button" v-bind:class="[getThemeClass('game-button'), affordable ? '' : getThemeClass('unaffordable')]" v-on:click="$emit('event')">
            <div class="prestige-upgrade-desc" v-bind:class="getThemeClass('text')">{{ description }}</div>
            <div class="prestige-upgrade-current" v-bind:class="getThemeClass('text')">Currently: {{ formatFunction(boost) }}</div>
            <div class="prestige-upgrade-cost" v-bind:class="getThemeClass('text')">Cost: {{ cost }} Prestige Points</div>
        </button>
    </div>`
});
