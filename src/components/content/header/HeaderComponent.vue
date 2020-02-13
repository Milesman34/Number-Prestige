<!-- This component represents the app's header -->
<!-- Name is used to avoid conflicts with builtin HTML elements -->
<template>
    <div id="header" v-bind:class="themeClass('header')">
        <header-item v-bind:state="gameStates.main"></header-item>
        <header-item v-bind:state="gameStates.options"></header-item>
    </div>
</template>

<script>
    import HeaderItem from "./HeaderItem.vue";

    import gameStates from "../../../enums/gameStates.js";

    import theme from "../../../mixins/store/theme.js";

    export default {
        mixins: [theme],

        //This seems to be a good way to load enums
        data: () => ({
            gameStates
        }),

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

    .header-dark {
        background-color: rgb(24, 24, 24);
    }

    .header-light {
        background-color: rgb(200, 200, 200);
    }

    .header-gradient {
        background-image: linear-gradient(rgb(36, 36, 36), rgb(61, 61, 61));
    }
</style>
