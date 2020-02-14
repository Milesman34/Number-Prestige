import { defaultSave } from "../enums.js";

import { gameState, selector, theme } from "./storeIO.js";

// This mixin handles the player's save data
export default {
    methods: {
        // Due to how saving works, it must also contain the methods used in some other mixins
        ...gameState.methods,
        ...selector.methods,
        ...theme.methods,

        // Encodes the player's save data
        encodeSaveData({ theme, gameState }) {
            return `${theme}|${gameState}`;
        },

        // Decodes the given save data
        decodeSaveData(saveData) {
            let items = saveData.split("|");

            // Loads default items if needed
            return {
                theme: items.length > 0 ? items[0] : defaultSave.theme,
                gameState: items.length > 1 ? items[1] : defaultSave.gameState
            };
        },

        // Saves the player's save data
        save() {
            localStorage.setItem("save", this.encodeSaveData({
                theme: this.getTheme(),
                gameState: this.getGameState()
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

            // Saves over player's save file
            this.save();
        },

        // Attempts to get the save data from localStorage
        getSaveFromStorage() {
            let save = localStorage.getItem("save");

            // Returns the save if possible, returning the default save data if the save could not be found
            return save === null ? this.encodeSaveData({
                theme: defaultSave.theme,
                gameState: defaultSave.gameState
            }) : save;
        },

        // Loads the player's save data
        loadSaveData() {
            let saveData = this.getSaveFromStorage();

            let saveObject = this.decodeSaveData(saveData);

            // Sets certain values based on the values in the save object
            this.setGameState(saveObject.gameState);
            this.setTheme(saveObject.theme);
        }
    }
};
