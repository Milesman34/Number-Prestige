// This mixin grants access to the theme variable
export const theme = {
    methods: {
        getTheme() {
            return this.$store.state.theme;
        },

        setTheme(theme) {
            this.$store.commit("setTheme", theme);
        },

        // Creates a class for a component based on the current theme
        themeClass(className) {
            return `${className}-${this.getTheme()}`;
        }
    }
};

// This mixin grants access to the selector variable
export const selector = {
    methods: {
        getSelector() {
            return this.$store.state.selector;
        },

        openSelector(selector) {
            this.$store.commit("openSelector", selector);
        },

        closeSelector() {
            this.$store.commit("closeSelector");
        }
    }
};

// This mixin grants access to the gameState variable
export const gameState = {
    methods: {
        getGameState() {
            return this.$store.state.gameState;
        },

        setGameState(gameState) {
            this.$store.commit("setGameState", gameState);

            // Closes open selectors
            this.$store.commit("closeSelector");
        }
    }
};
