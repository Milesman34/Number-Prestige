//App
let app = new Vue({
    el: "#container",

    mixins: [utils],

    data: {
        //Current theme
        theme: "dark",

        //Current state
        state: "main",

        //Current open selector
        selector: "none",

        //Current score
        score: 0,

        //Current prestige goal
        goal: 10,

        //Current amount gained on click
        gain: 1,

        //Number of prestiges
        prestiges: 0,

        //Number of prestige points
        prestigePoints: 0,

		//Is auto-click unlocked
		autoClickUnlocked: false,
        justUnlockedAutoClick: false,

		//Is auto-prestige unlocked
		autoPrestigeUnlocked: false,
        justUnlockedAutoPrestige: false,

		//Should the game use auto-click and auto-prestige?
		autoClickOn: true,
		autoPrestigeOn: false,

        //Prestige upgrades
        upgrades: [
            //Prestige point multiplier upgrade
            {
                cost: 2,
                costScaling: 5,

                amount: 0,

                boost() {
                    return 2 ** this.amount;
                }
            },

            //Number gain upgrade
            {
                cost: 4,
                costScaling: 5,

                amount: 0,

                boost() {
                    return this.amount;
                }
            },

            //Reduce requirement upgrade
            {
                cost: 5,
                costScaling: 5,

                amount: 0,

                boost() {
                    return 0.9 ** this.amount;
                }
            },

			//Auto-Click speed upgrade
			{
				cost: 4,
				costScaling: 3,

				amount: 0,

				boost() {
					return 2 ** this.amount;
				}
			}
        ],

        //Current save file
        currentSaveFile: 0,

        //All saves
        saveFiles: ["", "", ""],
    },

    methods: {
        //UTILITY FUNCTIONS
        //Generates the theme class used for a given element
		//If the elem is an array, generates an array of classes
        themeClass(...elems) {
			return elems.map(e => `${e}-${this.theme}`);
        },

        //Rounds a number to a given number of decimal places
        roundTo(num, places = 0) {
        	return Math.round(num * 10 ** places) / (10 ** places);
        },

        //Formats a number in exponential format (if over the requirement)
        formatSci(num, limit = 1e6, places = 2) {
        	if (num >= limit) {
                //Splits the orders of magnitude and the amount before it to format it
        		let oom = Math.floor(Math.log10(num));
        		let div = this.roundTo(num / (10 ** oom), places);

        		return `${div}e${oom}`;
        	} else
        		return this.roundTo(num, places).toString();
        },

        //Returns the correct plural ending (s ending)
        pluralize(num) {
            return Math.abs(num) === 1 ? "" : "s"
        },

        //SETTERS
        //Sets the state of the game
        setState(state) {
            this.state = state;

            //Disables open selectors
            this.selector = "none";
        },

        //Updates the score
        setScore(score) {
            this.score = score;

			//Unlock auto-click if possible
			if (this.score >= 1000)
				this.unlockAutoClick();

			//Auto-prestige feature (currently really slow for some reason)
			if (this.isAutoPrestigeEnabled() && this.canPrestige())
				this.prestige();
        },

        addScore(score) {
            this.setScore(this.score + score);
        },

		//GETTERS
        //Gets the current prestige point gain
        getPrestigePointGain() {
            return this.upgrades[0].boost();
        },

		//Gets the actual score
		getScore() {
			return Math.floor(this.score);
		},

        //Actual number gain
        getGain() {
            return this.gain + this.upgrades[1].boost();
        },

        //Actual prestige goal
        getGoal() {
            return Math.floor(this.goal * this.upgrades[2].boost());
        },

		//Seconds required per autoclick
		getAutoClickInterval() {
			return (10 / this.upgrades[3].boost()) / Math.max(this.prestigePoints, 1);
		},

		//Checks if auto-click is enabled
		isAutoClickEnabled() {
			return this.autoClickUnlocked && this.autoClickOn;
		},

		//Checks if auto-prestige is enabled
		isAutoPrestigeEnabled() {
			return this.autoPrestigeUnlocked && this.autoPrestigeOn;
		},

        //Unlocks auto click
        unlockAutoClick() {
            this.autoClickUnlocked = true;
        },

        //Unlocks auto prestige
        unlockAutoPrestige() {
            this.autoPrestigeUnlocked = true;
        },

		//Checks if the player can prestige
		canPrestige() {
			return this.getScore() >= this.getGoal();
		},

        //GAME STUFF
        //Prestige resets score but doubles the goal and increases the gain by 1
        prestige() {
            //Checks if the player really wants to prestige (only on first prestige)
            if (
                this.prestiges === 0 &&
                !confirm("Are you sure you want to prestige? This will reset your score, while adding 1 to your number gain and doubling the goal. You will also receive a Prestige point.")
            ) return;

            this.setScore(0);
            this.gain++;
            this.goal *= 2;

            this.prestiges++;

            this.prestigePoints += this.getPrestigePointGain();

			//Unlock auto-prestige if possible
			if (this.prestigePoints >= 50)
				this.unlockAutoPrestige();
        },

		//Checks if the player can afford an upgrade
		canAfford(id) {
			return this.prestigePoints >= this.upgrades[id].cost;
		},

        //Attempts to buy an upgrade
        buyUpgrade(id) {
            let upgrade = this.upgrades[id];

            if (this.canAfford(id)) {
                this.prestigePoints -= upgrade.cost;

                upgrade.amount++;

                upgrade.cost *= upgrade.costScaling;

                //Mini-prestige element
                this.setScore(0);
                this.gain = 1;
                this.goal = 10;
            }
        },

        //SAVE FILE FUNCTIONS
        //Attempts to load a value from localStorage, replacing it with a default value if it does not exist
        lsGetOrSetDefault(item, def) {
            if (localStorage.getItem(item) === null)
                localStorage.setItem(item, def);

            return localStorage.getItem(item);
        },

        //Encodes the current save data
        encodeSaveData() {
            return `${this.theme}|${this.state}|${this.score}|${this.goal}|${this.gain}|${this.prestiges}|${this.prestigePoints}|${this.upgrades[0].cost}|${this.upgrades[0].amount}|${this.upgrades[1].cost}|${this.upgrades[1].amount}|${this.upgrades[2].cost}|${this.upgrades[2].amount}|${this.autoClickUnlocked}|${this.autoPrestigeUnlocked}|${this.upgrades[3].cost}|${this.upgrades[3].amount}|${this.autoClickOn}|${this.autoPrestigeOn}`;
        },

        //Sets a save file
        setSaveFile(file) {
            this.saveFiles[file] = this.encodeSaveData();

            //Saves to local storage
            localStorage.setItem(`save${file}`, this.saveFiles[file]);
        },

        //Loads a save file
        loadSaveFile(file) {
            let save = this.saveFiles[file];
            let data = save.split("|");

            this.theme = data[0];
            this.setState(data[1]);
            this.setScore(data.length >= 3 ? parseInt(data[2]) : 0);
            this.goal = data.length >= 4 ? parseInt(data[3]) : 10;
            this.gain = data.length >= 5 ? parseInt(data[4]) : 1;
            this.prestiges = data.length >= 6 ? parseInt(data[5]) : 0;
            this.prestigePoints = data.length >= 7 ? parseInt(data[6]) : 0;
            this.upgrades[0].cost = data.length >= 8 ? parseInt(data[7]) : 2;
            this.upgrades[0].amount = data.length >= 9 ? parseInt(data[8]) : 0;
            this.upgrades[1].cost = data.length >= 10 ? parseInt(data[9]) : 4;
            this.upgrades[1].amount = data.length >= 11 ? parseInt(data[10]) : 0;
            this.upgrades[2].cost = data.length >= 12 ? parseInt(data[11]) : 5;
            this.upgrades[2].amount = data.length >= 13 ? parseInt(data[12]) : 0;
			this.autoClickUnlocked = data.length >= 14 ? data[13] === "true" : false;
			this.autoPrestigeUnlocked = data.length >= 15 ? data[14] === "true" : false;
			this.upgrades[3].cost = data.length >= 16 ? parseInt(data[15]) : 4;
			this.upgrades[3].amount = data.length >= 17 ? parseInt(data[16]) : 0;
			this.autoClickOn = data.length >= 18 ? data[17] === "true" : true;
			this.autoPrestigeOn = data.length >= 19 ? data[18] === "true" : false;
        },

        //Saves the game in the current save slot
        save() {
            this.setSaveFile(this.currentSaveFile);
        },

        //Resets the current save file
        resetSave() {
            //Prompt to make sure user wants to reset
            if (
                confirm("Do you want to reset your save? You will lose everything!") &&
                confirm("Are you sure about this? There is no way to get your save back!") &&
                confirm("This is your last warning!")
            ) {
                //Resets all values
                this.theme = "dark"
                this.setState("main");
                this.setScore(0);
				this.selector = "none";
                this.goal = 10;
                this.gain = 1;
                this.prestiges = 0;
                this.prestigePoints = 0;
                this.upgrades[0].cost = 2;
                this.upgrades[0].amount = 0;
                this.upgrades[1].cost = 4;
                this.upgrades[1].amount = 0;
                this.upgrades[2].cost = 5;
                this.upgrades[2].amount = 0;
				this.upgrades[3].cost = 4;
				this.upgrades[3].amount = 0;
				this.autoClickUnlocked = false;
				this.autoPrestigeUnlocked = false;
				this.autoClickOn = true;
				this.autoPrestigeOn = false;

                //Saves over save file
                this.save();
            }
        },

		//Has the app tick
		tick(tps) {
			if (this.isAutoClickEnabled()) {
				let seconds = this.getAutoClickInterval();
				let gain = this.getGain();

				//Adds a fraction of the gain based on the tps and seconds required for autoclicking
				this.addScore(gain / (seconds * tps));
			}
		}
    }
});

//Attempts to load save files
app.saveFiles = app.saveFiles.map((e, i) => app.lsGetOrSetDefault(`save${i}`, app.encodeSaveData()));

//Gets the current save file
app.currentSaveFile = parseInt(app.lsGetOrSetDefault("saveFile", 0));

//Loads the current save file
app.loadSaveFile(app.currentSaveFile);

//Auto-save interval
setInterval(() => {
    app.save();
}, 5 * 1000);

//Sets up a series of ticks
const tps = 20;

setInterval(() => {
	app.tick(tps);
}, 1000 / tps);
