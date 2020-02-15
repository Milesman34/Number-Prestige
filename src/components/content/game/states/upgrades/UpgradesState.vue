<!-- This component represents the upgrades tab of the game -->
<template>
    <div id="upgrades">
        <upgrades-subtext></upgrades-subtext>
    </div>
</template>

<script>
    import UpgradesSubtext from "./UpgradesSubtext.vue";

    export default {
        components: {
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
</style>
