<!-- This component displays important text about buying upgrades -->
<template>
    <div id="upgrades-subtext" v-bind:class="themeClass('text')">Buying an upgrade will reset your score, prestige requirement, and number gain.</div>
</template>

<script>
    import { theme } from "../../../../../mixins/storeIO.js";

    export default {
        mixins: [theme]
    }
</script>

<style scoped>
    #upgrades-subtext {
        width: 100%;
        height: 100%;

        display: flex;

        justify-content: center;
        align-items: center;

        font-size: 85%;
    }
</style>
