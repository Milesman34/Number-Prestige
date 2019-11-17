//Removes the identifier from the element name
const removeIdentifier = elementName => ["#", "."].includes(elementName[0]) ?
    elementName.slice(1, elementName.length) :
    elementName;

//List of themes
//CSS class should be [element]-[theme-name]
const themes = ["light", "dark"];

//Elements to modify
const elements = ["#app", "#header", ".header-item"]

//Game constructor (only one at a time)
const Game = ({theme = "dark"} = {}) => {
    let obj = {
        theme: theme,

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
        }
    };

    obj.setTheme(obj.theme);

    return obj;
}
