import { autoClick, autoPrestige, gain, goal, notifications, prestigePoints, prestiges, score } from "./storeIO.js";

import calculatedValues from "./calculatedValues.js";

// This mixin has some useful game functions
export default {
    methods: {
        ...autoClick.methods,
        ...autoPrestige.methods,
        ...calculatedValues.methods,
        ...gain.methods,
        ...goal.methods,
        ...notifications.methods,
        ...prestigePoints.methods,
        ...prestiges.methods,
        ...score.methods,

        // Prestiges the game, resetting the player's score but increasing their number gain by 1 and doubling their goal
        prestige() {
            // Gives the player a warning if it is their first prestige
            if (!this.hasPrestiged() && !confirm(
                "Are you sure you want to prestige? This will reset your score, while adding 1 to your number gain and doubling the goal. You will also receive a Prestige point."
            )) return;

            // Resets the score
            this.resetScore();

            // Updates the number gain and prestige goal
            this.increaseGain();
            this.increaseGoal();

            // Gives the player the required number of prestige points and a prestiged stat
            this.addPrestigePoints(this.getUpgradeBoost(0));
            this.increasePrestiges();

            // If the player has at least 25 prestige points, auto-prestige is enabled
            if (this.getPrestigePoints() >= 25 && !this.isAutoPrestigeUnlocked()) {
                this.unlockAutoPrestige();

                this.pushNotification("Unlocked Auto-Prestige");
            }
        },

        // Adds to the player's score
        addScore(score) {
            this._addScore(score);

            // Unlocks auto-click if the score >= 1000
            if (this.getScore() >= 1000 && !this.isAutoClickUnlocked()) {
                this.unlockAutoClick();

                this.pushNotification("Unlocked Auto-Click");
            }

            // Auto-prestiges if applicable
            if (this.isAutoPrestigeActive() && this.canPrestige())
                this.prestige();
        }
    }
};
