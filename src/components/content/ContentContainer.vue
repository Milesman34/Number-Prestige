<!-- This component contains the app's main contents -->
<template>
    <div id="content-container">
        <header-component></header-component>
        <display-section></display-section>
        <game-component></game-component>
    </div>
</template>

<script>
    import DisplaySection from "./display-section/DisplaySection.vue";
    import GameComponent from "./game/GameComponent.vue";
    import HeaderComponent from "./header/HeaderComponent.vue";

    export default {
        components: {
            "display-section": DisplaySection,
            "game-component": GameComponent,
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
