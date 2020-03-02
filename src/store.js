import Vuex from "vuex";

import mixin from "./mixin.js";

// The API is very basic, but is expanded upon using the mixin
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
        prestiges: defaultSave.prestiges,

        // Amount of each upgrade
        upgradeAmounts: [0, 0, 0, 0, 0, 0],

        // Auto-click
        autoClick: {...defaultSave.autoClick},

        // Auto-prestige
        autoPrestige: {...defaultSave.autoPrestige},

        // List of active notifications (strings)
        notifications: []
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

        // Sets the active
        setSelector(state, selector) {
            state.selector = selector;
        },

        // Sets the score
        setScore(state, score) {
            state.score = score;
        },

        // Sets the goal
        setGoal(state, goal) {
            state.goal = goal;
        },

        // Sets the amount gained on click
        setGain(state, gain) {
            state.gain = gain;
        },

        // Sets the number of prestige points
        setPrestigePoints(state, prestigePoints) {
            state.prestigePoints = prestigePoints;
        },

        // Sets the number of prestiges
        setPrestiges(state, prestiges) {
            state.prestiges = prestiges;
        },

        // Sets upgradeAmounts
        setUpgradeAmounts(state, upgradeAmounts) {
            state.upgradeAmounts = [...upgradeAmounts];
        },

        // Sets autoClick
        setAutoClick(state, autoClick) {
            state.autoClick = {...autoClick};
        },

        // Sets the values of auto-prestige
        setAutoPrestige(state, autoPrestige) {
            state.autoPrestige = {...autoPrestige};
        },

        // Sets the current notifications array
        setNotifications(state, notifications) {
            state.notifications = [...notifications];
        }
    }
});
