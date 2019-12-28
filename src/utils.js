//Capitalizes a word
const capitalize = word => word[0].toUpperCase() + word.slice(1, word.length).toLowerCase();

//This is a mixin that contains various utility functions
const utils = {
    methods: {
        capitalize
    }
};
