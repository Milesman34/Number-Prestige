import Upgrade from "./classes/Upgrade.js";

// This file contains the main mixin used for the game
export default {
    data: () => {
        // All enums used in the game
        const enums = {
            // All themes used in the game
            themes: {
                light: "light",
                dark: "dark",
                gradient: "gradient"
            },

            // All valid gamestates
            gameStates: {
                main: "main",
                options: "options",
                upgrades: "upgrades",
                automation: "automation"
            },

            // All valid selector states
            selectorStates: {
                none: "none",
                selector: "selector"
            },
        };

        // All buyable upgrades
        const upgrades = [
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
        ];

        // Default values for various elements
        const defaultValues = {
            theme: enums.themes.light,
            gameState: enums.gameStates.main,

            score: 0,
            goal: 10,
            gain: 1,

            prestigePoints: 0,
            prestiges: 0,

            // Amounts of each upgrade (default to 0)
            upgradeAmounts: upgrades.map(upgrade => upgrade.amount),

            autoClick: {
                unlocked: false,
                enabled: true
            },

            autoPrestige: {
                unlocked: false,
                enabled: true
            }
        };

        // Various game configuration options
        const configs = {
            // Initial goal after buying an upgrade
            initialGoal: 10,

            // How much the goal increases on prestige
            goalIncreaseAmount: 2,

            // Initial number gain
            initialGain: 1
        };

        return {
            enums,
            upgrades,
            defaultValues,
            configs
        };
    },

    methods: {
        /* Store IO */
        // Gets the current theme
        getTheme() {
            return this.$store.state.theme;
        },

        // Sets the current theme
        setTheme(theme) {
            this.$store.commit("setTheme", theme);
        },

        // Resets the theme to the default
        resetTheme() {
            this.setTheme(this.defaultValues.theme);
        },

        // Returns a class for a component based on the current theme
        themeClass(className) {
            return `${className}-${this.getTheme()}`;
        },

        // Gets the current game state
        getGameState() {
            return this.$store.state.gameState;
        },

        // Sets the current game state
        setGameState(gameState) {
            this.$store.commit("setGameState", gameState);

            // Closes any open selectors
            this.closeSelector();
        },

        // Resets the current game state to the default
        resetGameState() {
            this.setGameState(this.defaultValues.gameState);
        },

        // Gets the current selector
        getSelector() {
            return this.$store.state.selector;
        },

        // Opens a selector
        openSelector(selector) {
            this.$store.commit("setSelector", selector);
        },

        // Closes the current selector
        closeSelector() {
            this.setSelector(this.enums.selectorStates.none);
        },

        // Gets the current score
        getScore() {
            return this.$store.state.score;
        },

        // Sets the score
        setScore(score) {
            this.$store.commit("setScore", score);
        },

        // Adds to the score
        addScore(score) {
            this.setScore(this.getScore() + score);
        },

        // Resets the score to 0
        resetScore() {
            this.setScore(0);
        },

        // Gets the current goal
        getGoal() {
            return this.$store.state.goal;
        },

        // Sets the goal
        setGoal(goal) {
            this.$store.commit("setGoal", goal);
        },

        // Increases the goal (x2)
        increaseGoal() {
            this.setGoal(this.getGoal() * this.configs.goalIncreaseAmount);
        },

        // Resets the goal
        resetGoal() {
            this.setGoal(this.configs.initialGoal);
        },

        // Gets the current gain
        getGain() {
            return this.$store.state.gain;
        },

        // Sets the number gain
        setGain(gain) {
            this.$store.commit("setGain", gain);
        },

        // Increases the number gain (+1)
        increaseGain() {
            this.setGain(this.getGain() + 1);
        },

        // Resets the number gain
        resetGain() {
            this.setGain(this.configs.initialGain);
        }
    }
};
