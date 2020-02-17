<!-- This component displays the next piece of automation that can be unlocked -->
<template>
    <div class="automation-next-unlock-text" v-bind:class="themeClass('text')" >{{ text }}</div>
</template>

<script>
    import { theme } from "../../../../../mixins/storeIO.js";

    export default {
        mixins: [theme],

        props: ["text"]
    };
</script>

<style scoped>
    .automation-next-unlock-text {
        height: 95%;

        display: flex;

        justify-content: center;
        align-items: center;

        font-size: 90%;
    }
</style>
