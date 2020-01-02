Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        //Current theme used
        theme: "dark"
    },

    mutations: {
        //Sets the theme
        setTheme(state, theme) {
            state.theme = theme;
        }
    }
})
