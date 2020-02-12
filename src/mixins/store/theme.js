//This mixin provides access to the theme variable in the store
export default {
    computed: {
        //Gets the current theme
        theme() {
            return this.$store.state.theme;
        }
    },

    methods: {
        //Sets the theme
        setTheme(theme) {
            this.$store.commit("setTheme", theme);
        },

        //Generates the current theme based on the class name provided
        themeClass(className) {
            return `${className}-${this.theme}`;
        }
    }
}
