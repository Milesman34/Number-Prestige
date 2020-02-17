import { gain, goal, prestigePoints, upgrades } from "./storeIO.js";

// Gets calculated variants of certain game values
export default {
    methods: {
        ...gain.methods,
        ...goal.methods,
        ...prestigePoints.methods,
        ...upgrades.methods,

        // Calculates the total number gain
        getTotalGain() {
            return this.getGain() + this.getUpgradeBoost(1);
        },

        // Calculates the actual prestige goal
        getActualGoal() {
            return Math.floor(this.getGoal() * this.getUpgradeBoost(2));
        },

        // Gets the interval for auto-click (10 / prestige points)
        getAutoClickInterval() {
            return 10 / Math.max(this.getPrestigePoints(), 1);
        },

        // Determines if the player can prestige
        canPrestige() {
            return this.getScore() >= this.getActualGoal();
        },

        // Determines if the auto-click interval is more than once per second
        isClickIntervalSubSecond() {
            return this.getAutoClickInterval() > 1;
        }
    }
};
