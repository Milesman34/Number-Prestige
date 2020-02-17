<!-- Text that displays the auto-click interval -->
<template>
    <font class="autoclick-speed-text-big">{{ formatSci(number) }}</font>
</template>

<script>
    import utils from "../../../../../../../mixins/utils.js";

    export default {
        mixins: [utils],

        props: ["number"]
    };
</script>

<style scoped>
    .autoclick-speed-text-big {
        font-size: 175%;
    }
</style>
