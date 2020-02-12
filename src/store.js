import Vuex from "vuex";

import gameStates from "./enums/gameStates.js";
import themes from "./enums/themes.js"

export default new Vuex.Store({
    state: {
        //Current theme
        theme: themes.themeDark,

        //Current game state
        gameState: gameStates.stateMain
    },

    mutations: {
        //Sets the theme
        setTheme(state, theme) {
            state.theme = theme;
        },

        //Changes the game's state
        setGameState(state, gameState) {
            state.gameState = gameState;
        }
    }
});
