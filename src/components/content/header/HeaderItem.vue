<!-- This component represents an item in the header -->
<template>
    <div class="header-item">
        {{ text }}
    </div>
</template>

<script>
    export default {
        props: ["text"]
    };
</script>

<style scoped>
    .header-item {
        display: flex;

        justify-content: center;
        align-items: center;

        grid-row: 1;

        font-size: 175%;

        user-select: none;
    }
</style>
