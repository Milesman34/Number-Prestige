//Capitalizes a word
const capitalize = word => word[0].toUpperCase() + word.slice(1, word.length).toLowerCase();

//Generates the theme class used for an element
const themeClass = (elem, theme) => `${elem}-${theme}`;

//This is a mixin that contains various utility functions
const utils = {
    methods: {
        capitalize,
        themeClass
    }
};
