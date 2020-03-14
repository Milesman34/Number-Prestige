<!-- Represents a prestige upgrade's button -->
<template>
    <div class="prestige-upgrade-container">
        <button class="prestige-upgrade-button" v-bind:class="[themeClass('game-button'), canAffordUpgrade(id) ? '' : themeClass('unaffordable')]" @click="() => canAffordUpgrade(id) && buyUpgrade(id)">
            <prestige-upgrade-description v-bind:description="description"></prestige-upgrade-description>
            <prestige-upgrade-current-display v-bind:id="id" v-bind:func="func"></prestige-upgrade-current-display>
            <prestige-upgrade-cost-display v-bind:id="id"></prestige-upgrade-cost-display>
        </button>
    </div>
</template>

<script>
    import PrestigeUpgradeCostDisplay from "./PrestigeUpgradeCostDisplay.vue";
    import PrestigeUpgradeCurrentDisplay from "./PrestigeUpgradeCurrentDisplay.vue";
    import PrestigeUpgradeDescription from "./PrestigeUpgradeDescription.vue";

    export default {
        props: ["id", "description", "func"],

        components: {
            "prestige-upgrade-cost-display": PrestigeUpgradeCostDisplay,
            "prestige-upgrade-current-display": PrestigeUpgradeCurrentDisplay,
            "prestige-upgrade-description": PrestigeUpgradeDescription
        }
    };
</script>

<style scoped>
    .prestige-upgrade-container {
        width: 100%;
        height: 100%;

        grid-row: 1;

        display: flex;

        justify-content: center;
        align-items: center;
    }

    .prestige-upgrade-button {
        width: 85%;
        height: 85%;

        grid-template-rows: 5% 17% 15% 10% 3% 12% auto;
        grid-template-columns: 100%;

        user-select: none;
    }

    /* Unaffordable themes */
    .unaffordable-dark {
    	background-color: rgb(24, 24, 24);
    }

    .unaffordable-dark:hover {
    	background-color: rgb(15, 15, 15);
    }

    .unaffordable-light {
    	background-color: rgb(185, 185, 185);
    }

    .unaffordable-light:hover {
    	background-color: rgb(175, 175, 175);
    }

    .unaffordable-gradient {
    	background-color: rgb(24, 24, 24);
    }

    .unaffordable-gradient:hover {
    	background-image: linear-gradient(rgb(86, 56, 56), rgb(111, 81, 81));
    }
</style>
