<!-- This component represents the app's header -->
<!-- Name is used to avoid conflicts with builtin HTML elements -->
<template>
    <div id="header">
        <header-item text="Main"></header-item>
        <header-item text="Options"></header-item>
    </div>
</template>

<script>
    import HeaderItem from "./HeaderItem.vue";

    export default {
        components: {
            "header-item": HeaderItem
        }
    };
</script>

<style scoped>
    #header {
        width: 100%;

        display: grid;

        grid-template-rows: 100%;
        grid-template-columns: repeat(auto-fill, auto);
    }
</style>
