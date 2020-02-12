<!-- This is the core app component -->
<template>
    <div id="app" v-bind:class="themeClass('app')">
        <content-container></content-container>
    </div>
</template>

<script>
    import ContentContainer from "./content/ContentContainer.vue";

    import gameStates from "../enums/gameStates.js";
    import themes from "../enums/themes.js";

    import gameState from "../mixins/store/gameState.js";
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
</style>
