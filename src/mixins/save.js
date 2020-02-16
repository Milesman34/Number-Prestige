import { defaultSave } from "../enums.js";

import { gain, gameState, goal, prestigePoints, prestiges, score, selector, theme, upgrades } from "./storeIO.js";

// This mixin handles the player's save data
export default {
    methods: {
        // Due to how saving works, it must also contain the methods used in some other mixins
        ...gain.methods,
        ...gameState.methods,
        ...goal.methods,
        ...prestigePoints.methods,
        ...prestiges.methods,
        ...score.methods,
        ...selector.methods,
        ...theme.methods,
        ...upgrades.methods,

        // Encodes the player's save data
        encodeSaveData({ theme, gameState, score, goal, gain, prestigePoints, prestiges, upgrades }) {
            return `${theme}|${gameState}|${score}|${goal}|${gain}|${prestigePoints}|${prestiges}|${upgrades[0].cost}|${upgrades[0].amount}|${upgrades[1].cost}|${upgrades[1].amount}|${upgrades[2].cost}|${upgrades[2].amount}`;
        },

        // Decodes the given save data
        decodeSaveData(saveData) {
            let items = saveData.split("|");

            // Loads default items if needed
            return {
                theme: items.length > 0 ? items[0] : defaultSave.theme,
                gameState: items.length > 1 ? items[1] : defaultSave.gameState,
                score: items.length > 2 ? parseInt(items[2]) : defaultSave.score,
                goal: items.length > 3 ? parseInt(items[3]) : defaultSave.goal,
                gain: items.length > 4 ? parseInt(items[4]) : defaultSave.gain,
                prestigePoints: items.length > 5 ? parseInt(items[5]) : defaultSave.prestigePoints,
                prestiges: items.length > 6 ? parseInt(items[6]) : defaultSave.prestiges,

                upgrades: [
                    {
                        cost: items.length > 7 ? parseInt(items[7]) : defaultSave.upgrades[0].cost,
                        amount: items.length > 8 ? parseInt(items[8]) : defaultSave.upgrades[0].amount
                    },

                    {
                        cost: items.length > 9 ? parseInt(items[9]) : defaultSave.upgrades[1].cost,
                        amount: items.length > 10 ? parseInt(items[10]) : defaultSave.upgrades[1].amount
                    },

                    {
                        cost: items.length > 11 ? parseInt(items[11]) : defaultSave.upgrades[2].cost,
                        amount: items.length > 12 ? parseInt(items[12]) : defaultSave.upgrades[2].amount
                    }
                ]
            };
        },

        // Saves the player's save data
        save() {
            localStorage.setItem("save", this.encodeSaveData({
                theme: this.getTheme(),
                gameState: this.getGameState(),
                score: this.getScore(),
                goal: this.getGoal(),
                gain: this.getGain(),
                prestigePoints: this.getPrestigePoints(),
                prestiges: this.getPrestiges(),

                upgrades: [
                    {
                        cost: this.getUpgradeCost(0),
                        amount: this.getUpgradeAmount(0)
                    },

                    {
                        cost: this.getUpgradeCost(1),
                        amount: this.getUpgradeAmount(1)
                    },

                    {
                        cost: this.getUpgradeCost(2),
                        amount: this.getUpgradeAmount(2)
                    }
                ]
            }));
        },

        // Confirms if the player wants to reset the game
        confirmReset() {
            return confirm("Do you want to reset your save? You will lose everything!") &&
                confirm("Are you sure about this? There is no way to get your save back!") &&
                confirm("This is your last warning!")
        },

        // Resets the player's save data
        resetSave() {
            this.setGameState(defaultSave.gameState);
            this.closeSelector();
            this.setTheme(defaultSave.theme);
            this.setScore(defaultSave.score);
            this.setGoal(defaultSave.goal);
            this.setGain(defaultSave.gain);
            this.setPrestigePoints(defaultSave.prestigePoints);
            this.setPrestiges(defaultSave.prestiges);

            // Sets upgrade variables
            defaultSave.upgrades.forEach((upgrade, id) => {
                this.setUpgradeCost(id, upgrade.cost);
                this.setUpgradeAmount(id, upgrade.amount);
            });

            // Saves over player's save file
            this.save();
        },

        // Attempts to get the save data from localStorage
        getSaveFromStorage() {
            let save = localStorage.getItem("save");

            // Returns the save if possible, returning the default save data if the save could not be found
            return save === null ? this.encodeSaveData({
                theme: defaultSave.theme,
                gameState: defaultSave.gameState,
                score: defaultSave.score,
                goal: defaultSave.goal,
                gain: defaultSave.gain,
                prestigePoints: defaultSave.prestigePoints,
                prestiges: defaultSave.prestiges,

                upgrades: [
                    {
                        cost: defaultSave.upgrades[0].cost,
                        amount: defaultSave.upgrades[0].amount
                    },

                    {
                        cost: defaultSave.upgrades[1].cost,
                        amount: defaultSave.upgrades[1].amount
                    },

                    {
                        cost: defaultSave.upgrades[2].cost,
                        amount: defaultSave.upgrades[2].amount
                    }
                ]
            }) : save;
        },

        // Loads the player's save data
        loadSaveData() {
            let saveData = this.getSaveFromStorage();

            let saveObject = this.decodeSaveData(saveData);

            // Sets certain values based on the values in the save object
            this.setGameState(saveObject.gameState);
            this.setTheme(saveObject.theme);
            this.setScore(saveObject.score);
            this.setGoal(saveObject.goal);
            this.setGain(saveObject.gain);
            this.setPrestigePoints(saveObject.prestigePoints);
            this.setPrestiges(saveObject.prestiges);

            // Sets variables for upgrades
            saveObject.upgrades.forEach((upgrade, id) => {
                this.setUpgradeCost(id, upgrade.cost);
                this.setUpgradeAmount(id, upgrade.amount);
            });
        }
    }
};
