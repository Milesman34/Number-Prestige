import Vuex from "vuex";

import { gameStates, selectorStates, themes } from "./enums.js";

export default new Vuex.Store({
    state: {
        // Current theme
        theme: themes.light,

        // Current game state
        gameState: gameStates.main,

        // Current open selector
        selector: selectorStates.none
    },

    mutations: {
        // Sets the theme
        setTheme(state, theme) {
            state.theme = theme;
        },

        // Changes the game's state
        setGameState(state, gameState) {
            state.gameState = gameState;
        },

        // Opens a selector
        openSelector(state, selector) {
            state.selector = selector;
        },

        // Closes any active selectors
        closeSelector(state) {
            state.selector = selectorStates.none;
        }
    }
});
