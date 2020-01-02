Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        theme: "dark"
    },

    mutations: {
        //Sets the theme
        setTheme(state, theme) {
            state.theme = theme;
        }
    }
})
