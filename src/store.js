import Vuex from "vuex";

import { defaultSave, selectorStates } from "./enums.js";

import Upgrade from "./classes/Upgrade.js";

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

        // Purchaseable upgrades
        upgrades: [
            // Prestige point multiplier
            Upgrade({
                cost: defaultSave.upgrades[0].cost,
                scaling: 5,

                amount: defaultSave.upgrades[0].amount,

                boost() {
                    return 2 ** this.amount;
                }
            }),

            // Number gain boost
            Upgrade({
                cost: defaultSave.upgrades[1].cost,
                scaling: 5,

                amount: defaultSave.upgrades[1].amount,

                boost() {
                    return this.amount;
                }
            }),

            // Goal reduction upgrade
            Upgrade({
                cost: defaultSave.upgrades[2].cost,
                scaling: 5,

                amount: defaultSave.upgrades[2].amount,

                boost() {
                    return 0.9 ** this.amount;
                }
            })
        ],

        // Auto-click
        autoClick: {...defaultSave.autoClick},

        // Auto-prestige
        autoPrestige: {...defaultSave.autoPrestige}
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

        // Resets the goal
        resetGoal(state) {
            state.goal = 10;
        },

        // Sets the amount gained on click
        setGain(state, gain) {
            state.gain = gain;
        },

        // Increases the gain by adding 1 to it
        increaseGain(state) {
            state.gain++;
        },

        // Resets the number gained
        resetGain(state) {
            state.gain = 1;
        },

        // Sets the number of prestige points
        setPrestigePoints(state, prestigePoints) {
            state.prestigePoints = prestigePoints;
        },

        // Adds to the number of prestige points
        addPrestigePoints(state, prestigePoints) {
            state.prestigePoints += prestigePoints;
        },

        // Subtracts from the number of prestige points
        subtractPrestigePoints(state, prestigePoints) {
            state.prestigePoints -= prestigePoints;
        },

        // Sets the number of prestiges
        setPrestiges(state, prestiges) {
            state.prestiges = prestiges;
        },

        // Increases the number of prestiges by 1
        increasePrestiges(state) {
            state.prestiges++;
        },

        // Sets the amount of an upgrade
        setUpgradeAmount(state, { id, amount }) {
            state.upgrades[id].amount = amount;
        },

        // Sets the cost of an upgrade
        setUpgradeCost(state, { id, cost }) {
            state.upgrades[id].cost = cost;
        },

        // Buys an upgrade
        buyUpgrade(state, id) {
            state.upgrades[id].buy();
        },

        // Unlocks auto-click
        unlockAutoClick(state) {
            state.autoClick.unlocked = true;
        },

        // Locks auto-click
        lockAutoClick(state) {
            state.autoClick.unlocked = false;
        },

        // Enables auto-click
        enableAutoClick(state) {
            state.autoClick.enabled = true;
        },

        // Disables auto-click
        disableAutoClick(state) {
            state.autoClick.enabled = false;
        },

        // Toggles auto-click
        toggleAutoClick(state) {
            state.autoClick.enabled = !state.autoClick.enabled;
        },

        // Unlocks auto-prestige
        unlockAutoPrestige(state) {
            state.autoPrestige.unlocked = true;
        },

        // Locks auto-prestige
        lockAutoPrestige(state) {
            state.autoPrestige.unlocked = false;
        },

        // Enables auto-prestige
        enableAutoPrestige(state) {
            state.autoPrestige.enabled = true;
        },

        // Disables auto-prestige
        disableAutoPrestige(state) {
            state.autoPrestige.enabled = false;
        },

        // Toggles auto-prestige
        toggleAutoPrestige(state) {
            state.autoPrestige.enabled = !state.autoPrestige.enabled;
        }
    }
});
