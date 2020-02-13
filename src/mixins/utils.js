//This mixin provides some useful utility functions
export default {
    methods: {
        //Capitalizes a word
        capitalize(word) {
            return word[0].toUpperCase() + word.slice(1, word.length).toLowerCase();
        }
    }
};
