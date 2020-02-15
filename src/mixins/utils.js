// This mixin provides some useful utility functions
export default {
    methods: {
        // Capitalizes a word
        capitalize(word) {
            return word[0].toUpperCase() + word.slice(1, word.length).toLowerCase();
        },

        //Rounds a number based on the given number of decimal places, rounding it normally if it is too big
        roundTo(num, places = 0) {
            return num * 10 ** places === Infinity
                ? Math.round(num)
                : Math.round(num * 10 ** places) / 10 ** places;
        },

        //Formats a number with scientific notation
        //limit variable controls how large a number must be to be formatted
        formatSci(num, limit = 1e6, places = 2) {
            if (num === Infinity) return "Infinity";
            if (num < 0) return `-${this.formatSci(-num, limit, places)}`;
            else if (num === 0) return "0";
            else if (num < 10 ** -places / 2)
                return `1 / ${this.formatSci(1 / num, limit, places)}`;
            else if (num >= limit) {
                //Splits the orders of magnitude and the amount before it to format it
                let oom = Math.floor(Math.log10(num));
                let div = this.roundTo(num / 10 ** oom, places);

                return `${div}e${oom}`;
            } else return this.roundTo(num, places).toString();
        },

        //Returns the plural ending of a number (for standard uses)
        pluralEnding(num) {
            return Math.abs(num) === 1 ? "" : "s";
        }
    }
};
