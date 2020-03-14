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
                theme: "theme"
            },

            // All automation elements
            automationElements: {
                click: "click",
                prestige: "prestige"
            }
        };

        // Default values for various elements
        const defaultValues = {
            theme: enums.themes.light,
            gameState: enums.gameStates.main,

            score: 0,
            goal: 10,
            gain: 1,

            prestigePoints: 0,
            prestiges: 0,

            upgrades: [
                { amount: 0 },
                { amount: 0 },
                { amount: 0 },
                { amount: 0 },
                { amount: 0 },
                { amount: 0 }
            ],

            automation: {
                click: {
                    unlocked: false,
                    enabled: true
                },

                prestige: {
                    unlocked: false,
                    enabled: true
                }
            }
        };

        // Various game configuration options
        const configs = {
            // Initial goal after buying an upgrade
            initialGoal: 10,

            // How much the goal increases on prestige
            goalIncreaseAmount: 2,

            // Initial number gain
            initialGain: 1,

            // How long notifications stay up
            notificationTime: 2000
        };

        return {
            configs,
            defaultValues,
            enums
        };
    },

    methods: {
        /* Utils */
        // Capitalizes a word
        capitalize(word) {
            return word[0].toUpperCase() + word.slice(1, word.length).toLowerCase();
        },

        //Rounds a number based on the given number of decimal places, rounding it normally if it is too big
        roundTo(num, places = 0) {
            return num * 10 ** places === Infinity
                ? Math.round(num)
                : Math.round(num * 10 ** places) / 10 ** places;
        },

        //Formats a number with scientific notation
        //limit variable controls how large a number must be to be formatted
        formatSci(num, limit = 1e6, places = 2) {
            if (num === Infinity) return "Infinity";
            if (num < 0) return `-${this.formatSci(-num, limit, places)}`;
            else if (num === 0) return "0";
            else if (num < 10 ** -places / 2)
                return `1 / ${this.formatSci(1 / num, limit, places)}`;
            else if (num >= limit) {
                //Splits the orders of magnitude and the amount before it to format it
                let oom = Math.floor(Math.log10(num));
                let div = this.roundTo(num / 10 ** oom, places);

                return `${div}e${oom}`;
            } else return this.roundTo(num, places).toString();
        },

        //Returns the plural ending of a number (for standard uses)
        pluralEnding(num) {
            return Math.abs(num) === 1 ? "" : "s";
        },

        // Parses a string into a boolean
        parseBool(str) {
            return str === "true" || str === true;
        },

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
            this.$store.commit("openSelector", selector);
        },

        // Closes the current selector
        closeSelector() {
            this.openSelector(this.enums.selectorStates.none);
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

            // Unlocks auto-click if the player has at least 1000 points
            if (this.canUnlockAutoClick()) {
                this.unlockAutoClick();

                // Unlocks auto-prestige if the player already could unlock it
                if (this.canUnlockAutoPrestige())
                    this.unlockAutoPrestige();
            }

            // Auto-prestiges if applicable
            if (this.isAutoPrestigeActive() && this.canPrestige())
                this.prestige();
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

        // Adds to the number gain
        addGain(gain) {
            this.setGain(this.getGain() + gain);
        },

        // Resets the number gain
        resetGain() {
            this.setGain(this.configs.initialGain);
        },

        // Gets the number of prestige points
        getPrestigePoints() {
            return this.$store.state.prestigePoints;
        },

        // Sets the number of prestige points
        setPrestigePoints(points) {
            this.$store.commit("setPrestigePoints", points);
        },

        // Adds to the number of prestige points
        addPrestigePoints(points) {
            this.setPrestigePoints(this.getPrestigePoints() + points);
        },

        // Subtracts from the number of prestige points
        subtractPrestigePoints(points) {
            this.setPrestigePoints(this.getPrestigePoints() - points);
        },

        // Resets the number of prestige points
        resetPrestigePoints() {
            this.setPrestigePoints(0);
        },

        // Gets the number of prestiges
        getPrestiges() {
            return this.$store.state.prestiges;
        },

        // Sets the number of prestiges
        setPrestiges(prestiges) {
            this.$store.commit("setPrestiges", prestiges);
        },

        // Increments the number of prestiges
        incrementPrestiges() {
            this.setPrestiges(this.getPrestiges() + 1);
        },

        // Resets the number of prestiges
        resetPrestiges() {
            this.setPrestiges(0);
        },

        // Gets the list of upgrades
        getUpgrades() {
            return this.$store.state.upgrades;
        },

        // Gets a specific upgrade
        getUpgrade(id) {
            return this.getUpgrades()[id];
        },

        // Gets the cost of an upgrade
        getUpgradeCost(id) {
            return this.getUpgrade(id).cost();
        },

        // Gets the amount the player has of an upgrade
        getUpgradeAmount(id) {
            return this.getUpgrade(id).amount;
        },

        // Gets the current boost given by an upgrade
        getUpgradeBoost(id) {
            return this.getUpgrade(id).boost();
        },

        // Sets the amount the player has of an upgrade
        setUpgradeAmount(id, amount) {
            this.$store.commit("setUpgradeAmount", { id, amount });
        },

        // Buys an upgrade
        buyUpgrade(id) {
            // Subtracts the cost of the upgrade
            this.subtractPrestigePoints(this.getUpgradeCost(id));

            this.$store.commit("buyUpgrade", id);

            // Resets the player's score, goal, and gain
            this.resetScore();
            this.resetGoal();
            this.resetGain();
        },

        // Gets the automation variable
        getAutomation() {
            return this.$store.state.automation;
        },

        // Returns the given automation element
        getAutomationElement(element) {
            return this.getAutomation()[element];
        },

        // Returns if the given automation element is unlocked
        isAutomationElementUnlocked(element) {
            return this.getAutomationElement(element).unlocked;
        },

        // Returns if the given automation element is enabled
        isAutomationElementEnabled(element) {
            return this.getAutomationElement(element).enabled;
        },

        // Returns if an automation element is both unlocked and enabled
        isAutomationElementActive(element) {
            return this.isAutomationElementUnlocked(element) && this.isAutomationElementEnabled(element);
        },

        // Sets if an automation element is unlocked
        setAutomationElementUnlocked(element, unlocked) {
            this.$store.commit("modifyAutomation", { element, settings: { unlocked } });
        },

        // Sets if an automation element is enabled
        setAutomationElementEnabled(element, enabled) {
            this.$store.commit("modifyAutomation", { element, settings: { enabled } });
        },

        // Unlocks an automation element
        unlockAutomationElement(element) {
            this.setAutomationElementUnlocked(element, true);
        },

        // Locks an automation element
        lockAutomationElement(element) {
            this.setAutomationElementUnlocked(element, false);
        },

        // Enables an automation element
        enableAutomationElement(element) {
            this.setAutomationElementEnabled(element, true);
        },

        // Disables an automation element
        disableAutomationElement(element) {
            this.setAutomationElementEnabled(element, false);
        },

        // Toggles an automation element
        toggleAutomationElement(element) {
            this.setAutomationElementEnabled(element, !this.isAutomationElementEnabled(element));
        },

        // Checks if auto-click is unlocked
        isAutoClickUnlocked() {
            return this.isAutomationElementUnlocked(this.enums.automationElements.click);
        },

        // Checks if auto-prestige is unlocked
        isAutoPrestigeUnlocked() {
            return this.isAutomationElementUnlocked(this.enums.automationElements.prestige);
        },

        // Checks if auto-click is enabled
        isAutoClickEnabled() {
            return this.isAutomationElementEnabled(this.enums.automationElements.click);
        },

        // Checks if auto-prestige is enabled
        isAutoPrestigeEnabled() {
            return this.isAutomationElementEnabled(this.enums.automationElements.prestige);
        },

        // Checks if auto-click is active
        isAutoClickActive() {
            return this.isAutomationElementActive(this.enums.automationElements.click);
        },

        // Checks if auto-prestige is active
        isAutoPrestigeActive() {
            return this.isAutomationElementActive(this.enums.automationElements.prestige);
        },

        // Returns if the player can unlock auto-click
        canUnlockAutoClick() {
            return !this.isAutoClickUnlocked() && this.getScore() >= 1000;
        },

        // Returns if the player can unlock auto-prestige
        canUnlockAutoPrestige() {
            return !this.isAutoPrestigeUnlocked() && this.getPrestigePoints() >= 25;
        },

        // Unlocks auto-click
        unlockAutoClick() {
            this.unlockAutomationElement(this.enums.automationElements.click);

            this.pushNotification("Unlocked Auto-Click");
        },

        // Unlocks auto-prestige
        unlockAutoPrestige() {
            this.unlockAutomationElement(this.enums.automationElements.prestige);

            this.pushNotification("Unlocked Auto-Prestige");
        },

        // Returns the list of notifications
        getNotifications() {
            return this.$store.state.notifications;
        },

        // Pushes a notification onto the list of notifications
        pushNotification(text) {
            this.$store.commit("pushNotification", text);

            // The notifications disappear after a certain amount of time
            setTimeout(this.removeNotification, this.configs.notificationTime);
        },

        // Removes the last notification
        removeNotification() {
            this.$store.commit("removeNotification");
        },

        /* Calculated Game Values */
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
        },

        // Returns if the player has prestiged
        hasPrestiged() {
            return this.getPrestiges() > 0;
        },

        // Returns if an upgrade is affordable
        canAffordUpgrade(id) {
            return this.getUpgradeCost(id) <= this.getPrestigePoints();
        },

        /* Game Functions */
        // Confirms if the player wants to prestige
        confirmPrestige() {
            return confirm("Are you sure you want to prestige? This will reset your score, while adding 1 to your number gain and doubling the goal. You will also receive a Prestige point.");
        },

        // Prestiges the game
        prestige() {
            // Gives the player a warning if it is their first prestige
            if (!this.hasPrestiged() && !this.confirmPrestige()) return;

            // Resets the score
            this.resetScore();

            // Updates the number gain and prestige goal
            this.addGain(1 + this.getUpgradeBoost(4));
            this.increaseGoal();

            // Gives the player the required number of prestige points and a prestiged stat
            this.addPrestigePoints(this.getUpgradeBoost(0));
            this.incrementPrestiges();

            // If the player has at least 25 prestige points, auto-prestige is enabled
            if (this.canUnlockAutoPrestige())
                this.unlockAutoPrestige();
        },

        /* Save Functions */
        // Encodes the player's save data
        encodeSaveData({ theme, gameState, score, goal, gain, prestigePoints, prestiges, upgrades, automation }) {
            return `${theme}|${gameState}|${score}|${goal}|${gain}|${prestigePoints}|${prestiges}|${upgrades[0].amount}|${upgrades[1].amount}|${upgrades[2].amount}|${upgrades[3].amount}|${upgrades[4].amount}|${upgrades[5].amount}|${automation.click.unlocked}|${automation.click.enabled}|${automation.prestige.unlocked}|${automation.prestige.enabled}`;
        },

        // Returns a list of save items from the given save data
        getSaveItems(saveData) {
            return saveData.split("|");
        },

        // Gets the item at the given index from the save data, using the default if the item is not found
        getSaveItem(saveData, index, def) {
            let items = this.getSaveItems(saveData);

            return items.length > index ? items[index] : def;
        },

        // Decodes the given save data
        decodeSaveData(saveData) {
            return {
                theme: this.getSaveItem(saveData, 0, this.defaultValues.theme),
                gameState: this.getSaveItem(saveData, 1, this.defaultValues.gameState),

                score: parseInt(this.getSaveItem(saveData, 2, this.defaultValues.score)),
                goal: parseInt(this.getSaveItem(saveData, 3, this.defaultValues.goal)),
                gain: parseInt(this.getSaveItem(saveData, 4, this.defaultValues.gain)),

                prestigePoints: parseInt(this.getSaveItem(saveData, 5, this.defaultValues.prestigePoints)),
                prestiges: parseInt(this.getSaveItem(saveData, 6, this.defaultValues.prestiges)),

                // Gets the amounts based on the respective indices
                upgrades: [7, 8, 9, 10, 11, 12].map((saveLoc, index) => ({ amount: parseInt(this.getSaveItem(saveData, saveLoc, this.defaultValues.upgrades[index].amount)) })),

                automation: {
                    click: {
                        unlocked: this.parseBool(this.getSaveItem(saveData, 13, this.defaultValues.automation.click.unlocked)),
                        enabled: this.parseBool(this.getSaveItem(saveData, 14, this.defaultValues.automation.click.enabled))
                    },

                    prestige: {
                        unlocked: this.parseBool(this.getSaveItem(saveData, 15, this.defaultValues.automation.prestige.unlocked)),
                        enabled: this.parseBool(this.getSaveItem(saveData, 16, this.defaultValues.automation.prestige.enabled))
                    }
                }
            }
        },

        // Saves the player's save data to localStorage
        save() {
            localStorage.setItem("save", this.encodeSaveData({
                theme: this.getTheme(),
                gameState: this.getGameState(),

                score: this.getScore(),
                goal: this.getGoal(),
                gain: this.getGain(),

                prestigePoints: this.getPrestigePoints(),
                prestiges: this.getPrestiges(),

                upgrades: this.getUpgrades(),

                automation: {
                    click: { ...this.getAutomationElement(this.enums.automationElements.click) },
                    prestige: { ...this.getAutomationElement(this.enums.automationElements.prestige) }
                }
            }));
        },

        // Confirms if the player wants to reset their save
        confirmReset() {
            return confirm("Do you want to reset your save? You will lose everything!") &&
                confirm("Are you sure about this? There is no way to get your save back!") &&
                confirm("This is your last warning!")
        },

        // Resets the player's save file
        resetSave() {
            this.resetGameState();

            this.closeSelector();

            this.resetTheme();

            this.resetScore();
            this.resetGoal();
            this.resetGain();

            this.resetPrestigePoints();
            this.resetPrestiges();

            // Sets upgrade amounts
            this.getUpgrades().forEach((_, index) => {
                this.setUpgradeAmount(index, this.defaultValues.upgrades[index].amount);
            });

            // Handles auto-click and auto-prestige
            this.setAutomationElementUnlocked(this.enums.automationElements.click, this.defaultValues.automation.click.unlocked);
            this.setAutomationElementEnabled(this.enums.automationElements.click, this.defaultValues.automation.click.enabled);

            this.setAutomationElementUnlocked(this.enums.automationElements.prestige, this.defaultValues.automation.click.unlocked);
            this.setAutomationElementEnabled(this.enums.automationElements.prestige, this.defaultValues.automation.click.enabled);

            // Saves over the player's save file
            this.save();
        },

        // Attempts to get the save data from localStorage
        getSaveFromStorage() {
            let save = localStorage.getItem("save");

            return save === null ? this.encodeSaveData({ ...this.defaultValues }) : save;
        },

        // Loads the player's save data
        loadSaveData() {
            let save = this.getSaveFromStorage();

            let saveObject = this.decodeSaveData(save);

            this.setGameState(saveObject.gameState);
            this.setTheme(saveObject.theme);

            this.setScore(saveObject.score);
            this.setGoal(saveObject.goal);
            this.setGain(saveObject.gain);

            this.setPrestigePoints(saveObject.prestigePoints);
            this.setPrestiges(saveObject.prestiges);

            // Sets upgrade amounts
            saveObject.upgrades.forEach((upgrade, id) => this.setUpgradeAmount(id, upgrade.amount));

            // Handles auto-click and auto-prestige
            this.setAutomationElementUnlocked(this.enums.automationElements.click, saveObject.automation.click.unlocked);
            this.setAutomationElementEnabled(this.enums.automationElements.click, saveObject.automation.click.enabled);

            this.setAutomationElementUnlocked(this.enums.automationElements.prestige, saveObject.automation.click.unlocked);
            this.setAutomationElementEnabled(this.enums.automationElements.prestige, saveObject.automation.click.enabled);
        }
    }
};
