<!-- This component represents the upgrades tab of the game -->
<template>
    <div id="upgrades">
        <upgrades-subtext></upgrades-subtext>

        <div id="prestige-upgrades-container">
            <prestige-upgrade-button v-bind:id="0" description="Multiply Prestige Point gain by 2" v-bind:func="e => `${formatSci(e)}x`"></prestige-upgrade-button>
            <prestige-upgrade-button v-bind:id="1" description="Add 1 to number gain" v-bind:func="e => `+${formatSci(e)}`"></prestige-upgrade-button>
            <prestige-upgrade-button v-bind:id="2" description="Reduce prestige goal by 10%" v-bind:func="e => `-${formatSci((1 - e) * 100)}%`"></prestige-upgrade-button>
            <prestige-upgrade-button v-if="isAutoClickUnlocked()" v-bind:id="3" description="Make Auto-Click 2x faster" v-bind:func="e => `${formatSci(e)}x`"></prestige-upgrade-button>
        </div>
    </div>
</template>

<script>
    import PrestigeUpgradeButton from "./prestige-upgrade-button/PrestigeUpgradeButton.vue";

    import UpgradesSubtext from "./UpgradesSubtext.vue";

    import { autoClick, goal } from "../../../../../mixins/storeIO.js";

    import utils from "../../../../../mixins/utils.js";

    export default {
        mixins: [autoClick, goal, utils],

        components: {
            "prestige-upgrade-button": PrestigeUpgradeButton,
            "upgrades-subtext": UpgradesSubtext
        }
    };
</script>

<style scoped>
    #upgrades {
        width: 100%;
        height: 100%;

        display: grid;

        grid-template-rows: 12% 30% auto;
        grid-template-columns: 100%;
    }

    #prestige-upgrades-container {
        width: 100%;
        height: 100%;

        grid-column: 1;

        display: grid;

        grid-template-rows: 100%;
        grid-template-columns: repeat(4, 25%);
    }
</style>
