//Gets and sets stuff from the store
const storeIO = {
    computed: {
        //Gets the current theme
        theme() {
            return this.$store.state.theme;
        },

        //Gets the current state
        state() {
            return this.$store.state.state;
        },

        //Gets the open selector
        selector() {
            return this.$store.state.selector;
        }
    },

    methods: {
        //Sets the theme
        setTheme(theme) {
            this.$store.commit("setTheme", theme);
        },

        //Sets the state
        setState(state) {
            this.$store.commit("setState", state);

            //Closes open selectors
            this.setSelector("none");
        },

        //Sets the open selector
        setSelector(selector) {
            this.$store.commit("setSelector", selector);
        }
    }
};
