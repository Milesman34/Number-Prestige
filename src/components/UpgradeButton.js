Vue.component("upgrade-button", {
    mixins: [utils, themeClassComponents],

    props: ["id", "description", "formatFunction", "boost", "cost", "canAfford"],

    computed: {
        currentTheme() {
            return this.$store.state.theme;
        }
    },

    template: `<div class="prestige-upgrade-container">
        <button class="prestige-upgrade-button" v-bind:class="[getThemeClass('game-button'), canAfford(id) ? '' : getThemeClass('unaffordable')]" v-on:click="$emit('buy-upgrade', id)">
            <div class="prestige-upgrade-desc" v-bind:class="getThemeClass('text')">{{ description }}</div>
            <div class="prestige-upgrade-current" v-bind:class="getThemeClass('text')">Currently: {{ formatFunction(boost) }}</div>
            <div class="prestige-upgrade-cost" v-bind:class="getThemeClass('text')">Cost: {{ cost }} Prestige Points</div>
        </button>
    </div>`
});
