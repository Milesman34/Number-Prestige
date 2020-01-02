//Gets and sets stuff from the store
const storeIO = {
    computed: {
        getTheme() {
            return this.$store.state.theme;
        },

        getState() {
            return this.$store.state.state;
        }
    },

    methods: {
        setTheme(theme) {
            this.$store.commit("setTheme", theme);
        },

        setState(state) {
            this.$store.commit("setState", state);
        }
    }
}
