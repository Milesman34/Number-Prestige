// This enum represents all valid themes
export const themes = {
    light: "light",
    dark: "dark",
    gradient: "gradient"
};

// This enum represents all valid game states
export const gameStates = {
    main: "main",
    options: "options"
};

// This enum represents all valid selector states
export const selectorStates = {
    none: "none",
    theme: "theme"
};

// This enum represents the default save file
export const defaultSave = {
    theme: themes.light,
    gameState: gameStates.main
};