<!-- This component represents the button for prestiging -->
<template>
    <button id="prestige-button" @click="prestige()" v-bind:class="[themeClass('game-button'), themeClass('text')]">Prestige for {{ getUpgradeBoost(0) }} Prestige Point{{ pluralEnding(getUpgradeBoost(0)) }}</button>
</template>

<script>
    export default {};
</script>

<style scoped>
    #prestige-button {
        width: 55%;
        height: 100%;

        display: flex;

        justify-content: center;
        align-items: center;

        font-size: 92.5%;

        text-align: center;

        user-select: none;
    }
</style>
