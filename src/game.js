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

        //SAVE FILE FUNCTIONS
        //Attempts to load a value from localStorage, replacing it with a default value if it does not exist
        lsGetOrSetDefault(item, def) {
            if (localStorage.getItem(item) === null)
                localStorage.setItem(item, def);

            return localStorage.getItem(item);
        },

        //Encodes the current save data
        encodeSaveData() {
            return `${this.theme}|${this.state}`;
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
