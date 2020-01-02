//Gets and sets stuff from the store
const storeIO = {
    computed: {
        theme() {
            return this.$store.state.theme;
        },

        state() {
            return this.$store.state.state;
        },

        selector() {
            return this.$store.state.selector;
        }
    },

    methods: {
        setTheme(theme) {
            this.$store.commit("setTheme", theme);
        },

        setState(state) {
            this.$store.commit("setState", state);

            //Closes open selectors
            this.setSelector("none");
        },

        setSelector(selector) {
            this.$store.commit("setSelector", selector);
        }
    }
};
