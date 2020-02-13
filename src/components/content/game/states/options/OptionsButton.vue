<!-- This button triggers an action -->
<template>
    <div class="options-button-container">
        <button class="options-button" v-bind:class="[themeClass('game-button'), themeClass('text')]" @click="func">
            {{ title }}
        </button>
    </div>
</template>

<script>
    import { theme } from "../../../../../mixins/storeIO.js";

    export default {
        mixins: [theme],

        props: ["title", "func"]
    };
</script>

<style scoped>
    .options-button {
        width: 100%;
        height: 100%;

        grid-row: 2;
        grid-column: 2;

        display: flex;

        justify-content: center;
        align-items: center;

        font-size: 235%;

    	user-select: none;
    }
</style>

<style>
    .options-button-container {
        display: grid;

        grid-template-rows: 10% auto 10%;
        grid-template-columns: 10% auto 10%;
    }
</style>
