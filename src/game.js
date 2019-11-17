//List of themes
//CSS class should be [element]-[theme-name]
const themes = ["light", "dark"];

//Game constructor (only one at a time)
const Game = ({theme = "dark"} = {}) => {
    let obj = {
        theme: theme,

        setTheme(theme) {
            this.theme = theme;

            //Removes all themes from the class
            themes.forEach(theme => {
                $("#app").removeClass(`app-${theme}`);
            });

            //Adds the required themes
            $("#app").addClass(`app-${this.theme}`);
        }
    };

    obj.setTheme(obj.theme);

    return obj;
}
