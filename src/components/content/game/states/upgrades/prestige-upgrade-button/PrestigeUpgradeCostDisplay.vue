<!-- Represents the part of a prestige upgrade that displays the current cost -->
<template>
    <div class="prestige-upgrade-cost" v-bind:class="themeClass('text')">Cost: {{ getUpgradeCost(id) }} Prestige Point{{ pluralEnding(getUpgradeCost(id)) }}</div>
</template>

<script>
    export default {
        props: ["id"]
    };
</script>

<style scoped>
    .prestige-upgrade-cost {
        grid-row: 6;

        display: flex;

        justify-content: center;
        align-items: center;

        font-size: 90%;
    }
</style>
