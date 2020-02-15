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
        goal: defaultSave.goal,

        // Amount gained per click
        gain: defaultSave.gain,

        // Number of prestige points
        prestigePoints: defaultSave.prestigePoints,

        // Number of times prestiged
        prestiges: defaultSave.prestiges
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

        // Resets the score
        resetScore(state) {
            state.score = 0;
        },

        // Sets the goal
        setGoal(state, goal) {
            state.goal = goal;
        },

        // Increases the goal by doubling it (done on prestige)
        increaseGoal(state) {
            state.goal *= 2;
        },

        // Sets the amount gained on click
        setGain(state, gain) {
            state.gain = gain;
        },

        // Increases the gain by adding 1 to it
        increaseGain(state) {
            state.gain++;
        },

        // Sets the number of prestige points
        setPrestigePoints(state, prestigePoints) {
            state.prestigePoints = prestigePoints;
        },

        // Adds to the number of prestige points
        addPrestigePoints(state, prestigePoints) {
            state.prestigePoints += prestigePoints;
        },

        // Sets the number of prestiges
        setPrestiges(state, prestiges) {
            state.prestiges = prestiges;
        },

        // Increases the number of prestiges by 1
        increasePrestiges(state) {
            state.prestiges++;
        }
    }
});
