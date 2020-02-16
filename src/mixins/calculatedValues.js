import { gain, goal, upgrades } from "./storeIO.js";

// Gets calculated variants of certain game values
export default {
    methods: {
        ...gain.methods,
        ...goal.methods,
        ...upgrades.methods,

        // Calculates the total number gain
        getTotalGain() {
            return this.getGain() + this.getUpgradeBoost(1);
        },

        // Calculates the actual prestige goal
        getActualGoal() {
            return Math.floor(this.getGoal() * this.getUpgradeBoost(2));
        }
    }
};
