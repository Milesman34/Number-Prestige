<!-- Represents the description of a prestige upgrade -->
<template>
    <div class="prestige-upgrade-description" v-bind:class="themeClass('text')">{{ description }}</div>
</template>

<script>
    import { theme } from "../../../../../../mixins/storeIO.js";

    export default {
        mixins: [theme],

        props: ["description"]
    };
</script>

<style scoped>
    .prestige-upgrade-description {
        grid-row: 2;

        display: flex;

        justify-content: center;
        align-items: center;

        text-align: center;

        font-size: 140%;

        margin-left: 10px;
        margin-right: 10px;
    }
</style>
