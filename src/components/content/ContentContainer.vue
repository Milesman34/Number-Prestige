<!-- This component contains the app's main contents -->
<template>
    <div id="content-container">
        <header-component></header-component>
    </div>
</template>

<script>
    import HeaderComponent from "./header/HeaderComponent.vue";

    export default {
        components: {
            "header-component": HeaderComponent
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
