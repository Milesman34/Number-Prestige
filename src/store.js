import Vuex from "vuex";

import { defaultSave, selectorStates } from "./enums.js";

export default new Vuex.Store({
    state: {
        // Current theme
        theme: defaultSave.theme,

        // Current game state
        gameState: defaultSave.gameState,

        // Current open selector
        selector: selectorStates.none,

        // Current score
        score: defaultSave.score,

        // Current goal for prestiging
        goal: defaultSave.goal
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
        },

        // Sets the score
        setScore(state, score) {
            state.score = score;
        },

        // Adds to the score
        addScore(state, score) {
            state.score += score;
        },

        // Sets the goal
        setGoal(state, goal) {
            state.goal = goal;
        },

        // Increases the goal by doubling it (done on prestige)
        increaseGoal(state) {
            state.goal *= 2;
        }
    }
});
