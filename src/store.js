import Vuex from "vuex";

import mixin from "./mixin.js";

import Upgrade from "./classes/Upgrade.js";

// Loads data from mixin
const defaultValues = mixin.data().defaultValues;
const enums = mixin.data().enums;

// The API is very basic, but is expanded upon using the mixin
export default new Vuex.Store({
    state: {
        // Current theme
        theme: defaultValues.theme,

        // Current game state
        gameState: defaultValues.gameState,

        // Current open selector
        selector: enums.selectorStates.none,

        // Current score
        score: defaultValues.score,

        // Current goal for prestiging
        goal: defaultValues.goal,

        // Amount gained per click
        gain: defaultValues.gain,

        // Number of prestige points
        prestigePoints: defaultValues.prestigePoints,

        // Number of times prestiged
        prestiges: defaultValues.prestiges,

        // All upgrades
        upgrades: [
            // Prestige Point multiplier
            Upgrade({
                initialCost: 2,
                costScaling: 5,

                boost() {
                    return 2 ** this.amount;
                }
            }),

            // Number gain boost upgrade
            Upgrade({
                initialCost: 4,
                costScaling: 5,

                boost() {
                    return this.amount;
                }
            }),

            // Prestige goal reduction upgrade
            Upgrade({
                initialCost: 5,
                costScaling: 5,

                boost() {
                    return 0.9 ** this.amount;
                }
            }),

            // Auto-Click speed boost upgrade
            Upgrade({
                initialCost: 4,
                costScaling: 3,

                boost() {
                    return 2 ** this.amount;
                }
            }),

            // Prestige power boost upgrade
            Upgrade({
                initialCost: 12,
                costScaling: 6,

                boost() {
                    return this.amount;
                }
            }),

            // Boost to number gain based on Prestige Points upgrade
            Upgrade({
                initialCost: 6,
                costScaling: 8,

                // Actual boost strength is multiplied by this
                boost() {
                    return this.amount;
                }
            })
        ].map((upgrade, id) => ({ ...upgrade, amount: defaultValues.upgrades[id].amount })),

        // Automation object
        automation: {
            // Auto-click
            click: { ...defaultValues.automation.click },

            // Auto-prestige
            prestige: { ...defaultValues.automation.prestige }
        },

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
        openSelector(state, selector) {
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

        // Sets the amount of an upgrade
        setUpgradeAmount(state, { id, amount }) {
            state.upgrades[id].amount = amount;
        },

        // Buys an upgrade
        buyUpgrade(state, id) {
            state.upgrades[id].buy();
        },

        // Modifies the values of an automation element
        modifyAutomation(state, { element, settings }) {
            state.automation[element] = { ...state.automation[element], ...settings };
        },

        // Adds a notification to notifications
        pushNotification(state, text) {
            state.notifications.push(text);
        },

        // Removes the last notification
        removeNotification(state) {
            state.notifications.shift();
        }
    }
});
