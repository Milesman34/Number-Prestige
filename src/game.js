//App
let app = new Vue({
    el: "#container",

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

        //Current save file
        currentSaveFile: 0,

        //All saves
        saveFiles: ["", "", ""],
    },

    methods: {
        //UTILITY FUNCTIONS
        //Capitalizes a word
        capitalize(word) {
            return word[0].toUpperCase() + word.slice(1, word.length).toLowerCase();
        },

        //Generates the theme class used for a given element
        themeClass(elem) {
            return `${elem}-${this.theme}`;
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
        		return num.toString();
        },

        //SETTERS
        //Sets the current theme
        setTheme(theme) {
            this.theme = theme;
        },

        //Sets the state of the game
        setState(state) {
            this.state = state;

            //Disables open selectors
            this.setSelector("none");
        },

        //Sets the current open selector
        setSelector(selector) {
            this.selector = selector;
        },

        //Updates the score
        setScore(score) {
            this.score = score;
        },

        addScore(score) {
            this.setScore(this.score + score);
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
            return `${this.theme}|${this.state}|${this.score}|${this.goal}|${this.gain}`;
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

            this.setTheme(data[0]);
            this.setState(data[1]);
            this.setScore(data.length >= 3 ? parseInt(data[2]) : 0);
            this.goal = data.length >= 4 ? parseInt(data[3]) : 10;
            this.gain = data.length >= 5 ? parseInt(data[4]) : 1;
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
                this.setTheme("dark");
                this.setState("main");
                this.setScore(0);
                this.goal = 10;
                this.gain = 1;

                //Saves over save file
                this.save();
            }
        },
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
