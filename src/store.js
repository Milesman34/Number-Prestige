Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        //Current theme used
        theme: "dark",

        //Current state
        state: "main",

        //Current selector
        selector: "none"
    },

    mutations: {
        //Sets the theme
        setTheme(state, theme) {
            state.theme = theme;
        },

        //Sets the state
        setState(state, _state) {
            state.state = _state;
        },

        //Sets the open selector
        setSelector(state, selector) {
            state.selector = selector;
        }
    }
});
