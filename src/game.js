//Removes the identifier from the element name
const removeIdentifier = elementName => ["#", "."].includes(elementName[0]) ?
    elementName.slice(1, elementName.length) :
    elementName;

//Capitalizes a word
const capitalizeWord = str => str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();

//Capitalizes a phrase
const capitalizePhrase = str => str.split(" ").map(capitalizeWord).join(" ");

//List of themes
//CSS class should be [element]-[theme-name]
const themes = ["light", "dark"];

//Elements to modify
const elements = ["#app", "#header", ".header-item", "#number-display", ".options-button", "#theme-options-button",
"#theme-options-text", "#theme-options-current", "#theme-selector", ".theme-selector-list-button", "#theme-selector-exit-button"];

//Potential game states
const gameStates = ["main", "options"];

//Game constructor (only one at a time)
const Game = ({theme = "dark", state = "main"} = {}) => {
    let obj = {
        //Current theme
        theme: theme,

        //Current state
        state: "main",

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

		//Opens the theme selector
		openThemeSelector() {
			$("#theme-selector-container").show();
		}
    };

	//Hides the theme selector
    $("#theme-selector-container").hide();

	//Sets the theme and state to the required values (with defaults)
    obj.setTheme(obj.theme);
    obj.setState(obj.state);

    return obj;
}
