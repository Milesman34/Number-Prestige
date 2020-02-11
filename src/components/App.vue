<!-- This is the core app component -->
<template>
    <div id="app">
        <content-container></content-container>
    </div>
</template>

<script>
    import ContentContainer from "./content/ContentContainer.vue";

    export default {
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
</style>
