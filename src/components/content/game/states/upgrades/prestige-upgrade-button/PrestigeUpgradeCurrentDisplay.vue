<!-- Represents the part of a prestige upgrade that displays the current boost -->
<template>
    <div class="prestige-upgrade-current" v-bind:class="themeClass('text')">Currently: {{ func(getUpgradeBoost(id)) }}</div>
</template>

<script>
    export default {
        props: ["id", "func"]
    };
</script>

<style scoped>
    .prestige-upgrade-current {
        grid-row: 4;

        display: flex;

        justify-content: center;
        align-items: center;

        font-size: 90%;
    }
</style>
