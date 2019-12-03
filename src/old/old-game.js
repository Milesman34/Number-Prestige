//List of themes
//CSS class should be [element]-[theme-name]
const themes = ["light", "dark"];

//Elements to modify
const elements = ["#app", "#header", ".header-item", "#number-display", ".options-button", "#theme-options-button",
"#theme-options-text", "#theme-options-current", "#theme-selector", "#theme-selector-title",
".theme-selector-list-button", "#theme-selector-exit-button", "#click-button", "#prestige-button",
"#prestige-point-display", "#upgrades-subtext", ".prestige-upgrade-button"];

//Potential game states
const gameStates = ["main", "options", "upgrades"];

//Interval for saving
const saveInterval = 5 * 1000;

//Game constructor (only one at a time)
const Game = ({theme = "dark", state = "main"} = {}) => {
    let obj = {
        //Current theme
        theme: theme,

        //Current state
        state: "main",

		//Current score
		score: 0,

		//Current amount gained on click
		gain: 1,

		//Current goal to prestige
		prestigeGoal: 10,

        //Number of prestiges
        prestiges: 0,

		//Number of prestige points
		prestigePoints: 0,

        //Amount the player has of each upgrade
        upgrades: [
            Upgrade({
                id: "prestige-point-multi-upgrade",

                cost: 2,
                costMulti: 5,

                boost() {
                    return 2 ** this.amount
                },

                currently: boost => `${boost}x`
            })
        ],

        //Save files
        saves: ["", "", ""],

        //Current save file
        currentSave: 0,

        //Encodes the save data
        encodeSaveData() {
            return `${this.theme}|${this.score}|${this.gain}|${this.prestigeGoal}|${this.prestiges}|${this.prestigePoints}|${this.upgrades[0].amount}|${this.upgrades[0].cost}`;
        },

        //Sets a save file
        setSaveFile(file) {
            /*
            Format is:
            THEME|SCORE|GAIN|PRESTIGEGOAL|PRESTIGES|PRESTIGEPOINTS|UPGRADE0BUYS|UPGRADE0COST
            */
            this.saves[file] = this.encodeSaveData();

            //Sets save file in local storage
            localStorage.setItem(`save${file}`, this.saves[file]);
        },

        //Loads a save file
        loadSaveFile(file) {
            let save = this.saves[file];
            let data = save.split("|");

            this.setTheme(data[0]);
            this.setScore(parseInt(data[1]));
            this.setGain(parseInt(data[2]));
            this.setGoal(parseInt(data[3]));

            this.prestiges = parseInt(data[4]);

            //At this point, the game has to check if the game has been updated, setting the values to the defaults if needed
            //Prestige points update
			this.setPrestigePoints(data.length >= 6 ? parseInt(data[5]) : 0);

            //Prestige upgrade 1 update
            this.upgrades[0].amount = data.length >= 7 ? parseInt(data[6]) : 0;
            this.upgrades[0].setCost(data.length >= 8 ? parseInt(data[7]) : 2);
        },

        //Saves the game in the current save file
        save() {
            this.setSaveFile(this.currentSave);
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
                this.setScore(0);
                this.setGain(1);
                this.setGoal(10);

                this.prestiges = 0;

				this.setPrestigePoints(0);

                this.setTheme("dark");
                this.setState("main");

                //Handles first prestige upgrade
                this.upgrades[0].amount = 0;
                this.upgrades[0].setCost(2);
                this.upgrades[0].updateBoost();

                this.updatePrestigePointGain();

                //Saves over save file
                this.save();

				//Hides prestige buttons
				$("#prestige-button").hide();
				$("#prestige-point-display").hide();

				//Hides upgrades
				$("#upgrades-header-item").hide();
            }
        },

        //Sets the theme
        setTheme(theme) {
            this.theme = theme;

            //Removes all themes from each element
            themes.forEach(theme => {
                elements.forEach(element => {
                    $(element).removeClass(`${removeIdentifier(element)}-${theme}`);
                });
            });

            //Adds the required themes
            elements.forEach(element => {
                $(element).addClass(`${removeIdentifier(element)}-${this.theme}`);
            });

            //Updates current theme text on theme button
            $("#theme-options-current").text(`Currently: ${capitalizePhrase(this.theme)}`);
        },

        //Sets the state of the game
        setState(state) {
            this.state = state;

            //Shows or hides parts of the game as needed
            gameStates.forEach(s => {
                if (this.state === s)
                    $(`#${s}`).show();
                else
                    $(`#${s}`).hide();
            });

            //Hides open selectors
            $("#theme-selector-container").hide();
        },

        //Sets the score to a value
        setScore(score) {
            this.score = score;

            //Updates score amount
            $("#number-display-main").text(formatSci(this.score));

            //Shows prestige button if needed
            if (this.score >= this.prestigeGoal) {
                $("#prestige-button").show();

            }
        },

		//Adds to the score
		addScore(score) {
			this.setScore(this.score + score);
		},

		//Updates the amount gained on click
		setGain(gain) {
			this.gain = gain;

			//Updates amount gained text
			$("#click-button").text(`Increase number by ${formatSci(obj.gain)}`);
		},

        //Updates the goal to prestige
        setGoal(goal) {
            this.prestigeGoal = goal;

            $("#number-display-goal").text(`Goal: ${formatSci(obj.prestigeGoal)}`);
        },

		//Updates prestige points
		setPrestigePoints(points) {
			this.prestigePoints = points;

			$("#prestige-point-display")
				.text(`You have ${formatSci(this.prestigePoints)} Prestige Point${points === 1 ? '' : 's'}`);
		},

		//Adds to the player's prestige points
		addPrestigePoints(points) {
			this.setPrestigePoints(this.prestigePoints + points);
		},

        //Subtracts from the player's prestige points
        subtractPrestigePoints(points) {
            this.setPrestigePoints(this.prestigePoints - points);
        },

        //Updates prestige point gain shown on button
        updatePrestigePointGain() {
            $("#prestige-button").text(`Prestige for ${formatSci(this.upgrades[0].boost())} Prestige Point${this.prestigePoints === 1 ? '' : 's'}`);
        },

        //Attempts to buy an upgrade if the player has enough prestige points
        buyUpgrade(upgrade) {
            let u = this.upgrades[upgrade];

            if (u.canBuy && this.prestigePoints >= u.cost) {
                //Actually buys the upgrade
                this.subtractPrestigePoints(u.cost);

                u.buy();

                //Resets gain and prestige requirement
                this.setScore(0);
                this.setGoal(10);
                this.setGain(1);

                //Prestige point gain is updated
                this.updatePrestigePointGain();
            }
        },

        //Prestiges
        //This resets score, but doubles the goal and adds 1 to gain
        prestige() {
            //Checks if the player really wants to prestige (only on first prestige)
            if (
                this.prestiges === 0 &&
                !confirm("Are you sure you want to prestige? This will reset your score, while adding 1 to your number gain and doubling the goal. You will also receive a Prestige point.")
            ) return;

            this.setScore(0);
            this.setGain(this.gain + 1);
            this.setGoal(this.prestigeGoal * 2);

            this.prestiges++;

            //Upgrade 0 affects prestige point gain
			this.addPrestigePoints(this.upgrades[0].boost());

            //Hides prestige button
            $("#prestige-button").hide();

			//Shows prestige point display
			$("#prestige-point-display").show();

			//Shows upgrades in the header
			$("#upgrades-header-item").show();
        }
    };

    //Attempts to load save file
    obj.saves = obj.saves.map((e, i) => lsGetOrSetDefault(`save${i}`, obj.encodeSaveData()));

    //Gets the current save file
    obj.currentSave = parseInt(lsGetOrSetDefault("saveFile", 0));

    //Loads the current save file
    obj.loadSaveFile(obj.currentSave);

	//Hides the theme selector
    $("#theme-selector-container").hide();

	//Sets the theme and state to the required values (with defaults)
    obj.setTheme(obj.theme);
    obj.setState(obj.state);

	//Sets the score to the proper value
	obj.setScore(obj.score);

	//Sets the goal to the proper value
	obj.setGoal(obj.prestigeGoal);

	//Updates click button text
	obj.setGain(obj.gain);

    //Player cannot prestige at first (unless they have enough points)
	if (obj.score < obj.prestigeGoal)
		$("#prestige-button").hide();

	//This doesn't show up if the player has not prestiged yet
	if (obj.prestiges === 0) {
		$("#prestige-point-display").hide();

		//Upgrades are disabled until you prestige
		$("#upgrades-header-item").hide();
	}

	//Updates attributes of each upgrade
    obj.upgrades[0].setCost(obj.upgrades[0].cost);
    obj.upgrades[0].updateBoost();

    obj.updatePrestigePointGain();

    //Sets up an interval for saving
    setInterval(() => {
        obj.save();
    }, saveInterval);

    return obj;
}
