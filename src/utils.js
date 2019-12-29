//Capitalizes a word
const capitalize = word => word[0].toUpperCase() + word.slice(1, word.length).toLowerCase();

//Generates the theme class used for an element
const themeClass = (elem, theme) => `${elem}-${theme}`;

//Rounds a number based on the given number of decimal places
//If the number is too large, it just rounds it normally
const roundTo = (num, places = 0) => (num * 10 ** places) === Infinity ?
    Math.round(num) :
    Math.round(num * 10 ** places) / (10 ** places);

//Formats a number with scientific notation
const formatSci = (num, limit = 1e6, places = 2) => {
    if (num < 0)
        return `-${formatSci(-num, limit, places)}`;
    else if (num === 0)
        return "0";
    else if (num < 10 ** (-places) / 2)
        return `1 / ${formatSci(1 / num, limit, places)}`;
    else if (num >= limit) {
        //Splits the orders of magnitude and the amount before it to format it
        let oom = Math.floor(Math.log10(num));
        let div = roundTo(num / (10 ** oom), places);

        return `${div}e${oom}`;
    } else
        return roundTo(num, places).toString();
};

//Returns the correct plural ending (standard "s" ending)
const pluralize = num => Math.abs(num) === 1 ? "" : "s";

//This is a mixin that contains various utility functions
const utils = {
    methods: {
        capitalize,
        formatSci,
        pluralize,
        roundTo,
        themeClass
    }
};

//This is a mixin that provides themeClass for components
const themeClassComponents = {
    methods: {
        themeClass,

        //Returns the current theme class
        getThemeClass(elem) {
            return this.themeClass(elem, this.currentTheme);
        }
    }
};
