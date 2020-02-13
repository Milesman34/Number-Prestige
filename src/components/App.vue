<!-- This is the core app component -->
<template>
    <div id="app" v-bind:class="themeClass('app')">
        <content-container></content-container>
    </div>
</template>

<script>
    import ContentContainer from "./content/ContentContainer.vue";

    import theme from "../mixins/store/theme.js";

    export default {
        mixins: [theme],

        components: {
            "content-container": ContentContainer
        }
    };
</script>

<style scoped>
    #app {
        position: absolute;

        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        display: grid;

        grid-template-rows: auto;
        grid-template-columns: auto;
    }

    .app-dark {
        background-color: rgb(20, 20, 20);
    }

    .app-light {
        background-color: rgb(210, 210, 210);
    }

    .app-gradient {
        background-image: linear-gradient(rgb(0, 0, 0), rgb(25, 25, 25));
    }
</style>

<!-- Global styles -->
<style>
    @font-face {
        font-family: "Open Sans";
        src: url("../fonts/opensans-regular-webfont.woff");
    }

    @font-face {
        font-family: "Plex Mono";
        src: url("../fonts/IBMPlexMono-Regular.ttf");
    }

    /*To let me style buttons*/
    button {
        all: unset
    }

    /*Text themes*/
    .text-dark {
    	color: rgb(255, 255, 255);
    	font-family: "Open Sans";
    }

    .text-light {
    	color: rgb(0, 0, 0);
    	font-family: "Open Sans";
    }

    .text-gradient {
    	color: rgb(255, 255, 255);
    	font-family: "Plex Mono";
    }

    /* Game button themes */
    .game-button-dark {
    	color: rgb(255, 255, 255);

        background-color: rgb(32, 32, 32);

        box-shadow: 2px 2px 2px black;
    }

    .game-button-dark:hover {
        background-color: rgb(40, 40, 40);
    }

    .game-button-light {
    	color: rgb(0, 0, 0);

        background-color: rgb(200, 200, 200);

        box-shadow: 2px 2px 2px rgb(180, 180, 180);
    }

    .game-button-light:hover {
        background-color: rgb(215, 215, 215);
    }

    .game-button-gradient {
    	color: rgb(255, 255, 255);

        background-color: rgba(0, 0, 0, 0);

    	border: 2px solid rgb(195, 195, 195);
    }

    .game-button-gradient:hover {
    	background-image: linear-gradient(rgb(56, 56, 56), rgb(81, 81, 81));
    }
</style>
