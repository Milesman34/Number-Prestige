//Gets and sets stuff from the store
const storeIO = {
    computed: {
        theme() {
            return this.$store.state.theme;
        }
    },

    methods: {
        setTheme(theme) {
            this.$store.commit("setTheme", theme);
        }
    }
}
