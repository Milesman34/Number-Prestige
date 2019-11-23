//Removes the identifier from the element name
const removeIdentifier = elementName => ["#", "."].includes(elementName[0]) ?
    elementName.slice(1, elementName.length) :
    elementName;

//Capitalizes a word
const capitalizeWord = str => str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();

//Capitalizes a phrase
const capitalizePhrase = str => str.split(" ").map(capitalizeWord).join(" ");

//Rounds a number to a given number of decimal places
const roundTo = (num, places = 0) =>
	Math.round(num * 10 ** places) / (10 ** places);

//Formats a number in exponential format (if over the requirement)
const formatSci = (num, limit = 1e6, places = 2) => {
	if (num >= limit) {
        //Splits the orders of magnitude and the amount before it to format it
		let oom = Math.floor(Math.log10(num));
		let div = roundTo(num / (10 ** oom), places);

		return `${div}e${oom}`;
	} else
		return num.toString();
}

//List of themes
//CSS class should be [element]-[theme-name]
const themes = ["light", "dark"];

//Elements to modify
const elements = ["#app", "#header", ".header-item", "#number-display", ".options-button", "#theme-options-button",
"#theme-options-text", "#theme-options-current", "#theme-selector", "#theme-selector-title",
".theme-selector-list-button", "#theme-selector-exit-button", "#click-button", "#prestige-button"];

//Potential game states
const gameStates = ["main", "options"];

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

        //Shows the theme selector
		showThemeSelector() {
			$("#theme-selector-container").show();
		},

        //Hides the theme selector
        hideThemeSelector() {
            $("#theme-selector-container").hide();
        },

        //Shows the prestige button
        showPrestigeButton() {
            $("#prestige-button").show();
        },

        //Hides the prestige button
        hidePrestigeButton() {
            $("#prestige-button").hide();
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
            this.hideThemeSelector();
        },

        //Sets the score to a value
        setScore(score) {
            this.score = score;

            //Updates score amount
            $("#number-display-main").text(formatSci(this.score));

            //Shows prestige button if needed
            if (this.score >= this.prestigeGoal) {
                this.showPrestigeButton();
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

        //Prestiges
        //This resets score, but doubles the goal and adds 1 to gain
        prestige() {
            this.setScore(0);
            this.setGain(this.gain + 1);
            this.setGoal(this.prestigeGoal * 2);

            //Hides prestige button
            this.hidePrestigeButton();
        }
    };

	//Hides the theme selector
    obj.hideThemeSelector();

	//Sets the theme and state to the required values (with defaults)
    obj.setTheme(obj.theme);
    obj.setState(obj.state);

	//Sets the score to the proper value
	obj.setScore(obj.score);

	//Sets the goal to the proper value
	obj.setGoal(obj.prestigeGoal);

	//Updates click button text
	obj.setGain(obj.gain);

    //Player cannot prestige at first
    obj.hidePrestigeButton();

    return obj;
}
