<!-- This component contains the app's main contents -->
<template>
    <div id="content-container">
        <header></header>
    </div>
</template>

<script>
    import Header from "./header/Header.vue";

    export default {
        components: {
            header: Header
        }
    };
</script>

<style scoped>
    #content-container {
        grid-row: 1;
        grid-column: 1;

        display: grid;

        grid-template-rows: 5% 10% auto;
        grid-template-columns: 100%;
    }
</style>
