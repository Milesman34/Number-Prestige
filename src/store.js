Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        //Current theme used
        theme: "dark",

        //Current state
        state: "main"
    },

    mutations: {
        //Sets the theme
        setTheme(state, theme) {
            state.theme = theme;
        },

        //Sets the current state
        setState(state, _state) {
            state.state = _state;
        }
    }
})
