// This mixin grants access to the theme variable
export const theme = {
    methods: {
        getTheme() {
            return this.$store.state.theme;
        },

        setTheme(theme) {
            this.$store.commit("setTheme", theme);
        },

        // Creates a class for a component based on the current theme
        themeClass(className) {
            return `${className}-${this.getTheme()}`;
        }
    }
};

// This mixin grants access to the selector variable
export const selector = {
    methods: {
        getSelector() {
            return this.$store.state.selector;
        },

        openSelector(selector) {
            this.$store.commit("openSelector", selector);
        },

        closeSelector() {
            this.$store.commit("closeSelector");
        }
    }
};

// This mixin grants access to the gameState variable
export const gameState = {
    methods: {
        getGameState() {
            return this.$store.state.gameState;
        },

        setGameState(gameState) {
            this.$store.commit("setGameState", gameState);

            // Closes open selectors
            this.$store.commit("closeSelector");
        }
    }
};

// This mixin grants access to the score variable
export const score = {
    methods: {
        getScore() {
            return this.$store.state.score;
        },

        setScore(score) {
            this.$store.commit("setScore", score);
        },

        addScore(score) {
            this.$store.commit("addScore", score);
        },

        resetScore() {
            this.$store.commit("resetScore");
        }
    }
};

// This mixin grants access to the goal variable
export const goal = {
    methods: {
        getGoal() {
            return this.$store.state.goal;
        },

        setGoal(goal) {
            this.$store.commit("setGoal", goal);
        },

        increaseGoal() {
            this.$store.commit("increaseGoal");
        },

        resetGoal() {
            this.$store.commit("resetGoal");
        }
    }
};

// This mixin grants access to the gain variable
export const gain = {
    methods: {
        getGain() {
            return this.$store.state.gain;
        },

        setGain(gain) {
            this.$store.commit("setGain", gain);
        },

        increaseGain() {
            this.$store.commit("increaseGain");
        },

        resetGain() {
            this.$store.commit("resetGain");
        }
    }
};

// This mixin grants access to the prestigePoints variable
export const prestigePoints = {
    methods: {
        getPrestigePoints() {
            return this.$store.state.prestigePoints;
        },

        setPrestigePoints(prestigePoints) {
            this.$store.commit("setPrestigePoints", prestigePoints);
        },

        addPrestigePoints(prestigePoints) {
            this.$store.commit("addPrestigePoints", prestigePoints);
        },

        subtractPrestigePoints(prestigePoints) {
            this.$store.commit("subtractPrestigePoints", prestigePoints);
        }
    }
};

// This mixin grants access to the prestiges variable
export const prestiges = {
    methods: {
        getPrestiges() {
            return this.$store.state.prestiges;
        },

        setPrestiges(prestiges) {
            this.$store.commit("setPrestiges", prestiges);
        },

        increasePrestiges() {
            this.$store.commit("increasePrestiges");
        },

        // Checks if the player has prestiged
        hasPrestiged() {
            return this.getPrestiges() > 0;
        }
    }
};

// This mixin grants access to the upgrades variable
export const upgrades = {
    methods: {
        // Gets the upgrades array
        getUpgrades() {
            return this.$store.state.upgrades;
        },

        // Returns the cost of a given upgrade
        getUpgradeCost(id) {
            return this.getUpgrades()[id].cost;
        },

        // Returns the amount of a given upgrade
        getUpgradeAmount(id) {
            return this.getUpgrades()[id].amount;
        },

        // Returns the boost given by a given upgrade
        getUpgradeBoost(id) {
            return this.getUpgrades()[id].boost();
        },

        setUpgradeAmount(id, amount) {
            this.$store.commit("setUpgradeAmount", { id, amount });
        },

        setUpgradeCost(id, cost) {
            this.$store.commit("setUpgradeCost", { id, cost });
        },

        buyUpgrade(id) {
            this.$store.commit("buyUpgrade", id);
        }
    }
}
