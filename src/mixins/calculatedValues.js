import { gain, goal, prestigePoints, upgrades } from "./storeIO.js";

// Gets calculated variants of certain game values
export default {
    methods: {
        ...gain.methods,
        ...goal.methods,
        ...prestigePoints.methods,
        ...upgrades.methods,

        // Calculates the strength of upgrade 5
        getUpgrade5Strength() {
            return Math.log10(Math.max(this.getPrestigePoints(), 1));
        },

        // Calculates the total number gain
        getTotalGain() {
            // Amount gained before upgrade 5
            let baseGain = this.getGain() + this.getUpgradeBoost(1);

            // Factors in upgrade 5 (if upgrade 5 has not been purchased, then this will be zero)
            return baseGain + this.getUpgrade5Strength() * this.getUpgradeBoost(5);;
        },

        // Calculates the actual prestige goal
        getActualGoal() {
            return Math.floor(this.getGoal() * this.getUpgradeBoost(2));
        },

        // Gets the interval for auto-click (10 / prestige points)
        // This formula is boosted by the 4th repeatable upgrade
        getAutoClickInterval() {
            return 10 / Math.max(this.getPrestigePoints() * this.getUpgradeBoost(3), 1);
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
