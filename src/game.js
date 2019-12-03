//App
let app = new Vue({
    el: "#app",

    data: {
        //Current theme
        theme: "dark",

        //Current state
        state: "main"
    },

    methods: {
        //Generates the theme class used for a given element
        themeClass(elem) {
            return `${elem}-${this.theme}`;
        }
    }
});
