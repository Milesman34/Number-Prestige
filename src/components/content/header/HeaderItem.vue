<!-- This component represents an item in the header -->
<template>
    <button class="header-item" @click="setGameState(state)" v-bind:class="[themeClass('header-item'), themeClass('text')]">
        {{ capitalize(state) }}
    </button>
</template>

<script>
    import gameState from "../../../mixins/store/gameState.js";
    import theme from "../../../mixins/store/theme.js";

    import utils from "../../../mixins/utils.js";

    export default {
        mixins: [gameState, theme, utils],

        props: ["state"]
    };
</script>

<style scoped>
    .header-item {
        display: flex;

        justify-content: center;
        align-items: center;

        grid-row: 1;

        font-size: 175%;

        user-select: none;
    }

    .header-item-dark {
    	box-shadow: 2px 2px 2px black;
    }

    .header-item-dark:hover {
        background-color: rgb(40, 40, 40);
    }

    .header-item-light {
    	box-shadow: 2px 2px 2px rgb(180, 180, 180);
    }

    .header-item-light:hover {
        background-color: rgb(215, 215, 215);
    }

    .header-item-gradient {
    	border: 2px solid rgb(195, 195, 195);
    }

    .header-item-gradient:hover {
        background-image: linear-gradient(rgb(56, 56, 56), rgb(81, 81, 81));
    }
</style>
