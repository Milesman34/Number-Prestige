import Vuex from "vuex";

import themes from "./enums/themes.js"

export default new Vuex.Store({
    state: {
        theme: themes.themeDark
    },

    mutations: {
        //Sets the theme
        setTheme(state, theme) {
            state.theme = theme;
        }
    }
});
