<!-- Text that displays the auto-click interval -->
<template>
    <font class="autoclick-speed-text-big">{{ formatSci(number) }}</font>
</template>

<script>
    export default {
        props: ["number"]
    };
</script>

<style scoped>
    .autoclick-speed-text-big {
        font-size: 175%;
    }
</style>
