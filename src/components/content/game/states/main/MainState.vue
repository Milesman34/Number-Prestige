<!-- This component represents the main area of the game -->
<template>
    <div id="main">
        <div id="click-button-container">
            <click-button></click-button>
        </div>
    </div>
</template>

<script>
    import ClickButton from "./ClickButton.vue";

    export default {
        components: {
            "click-button": ClickButton
        }
    };
</script>

<style scoped>
    #main {
        grid-row: 1;
        grid-column: 1;

        display: grid;

        grid-template-rows: 30% 70%;
        grid-template-columns: 100%;
    }

    #click-button-container {
    	grid-row: 1;
    	grid-column: 1;

    	display: flex;

        justify-content: center;
        align-items: center;

    	user-select: none;
    }
</style>
