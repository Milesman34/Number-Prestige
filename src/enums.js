// This enum represents all valid themes
export const themes = {
    light: "light",
    dark: "dark",
    gradient: "gradient"
};

// This enum represents all valid game states
export const gameStates = {
    main: "main",
    options: "options",
    upgrades: "upgrades",
    automation: "automation"
};

// This enum represents all valid selector states
export const selectorStates = {
    none: "none",
    theme: "theme"
};

// This enum represents the default save file
export const defaultSave = {
    theme: themes.light,
    gameState: gameStates.main,
    score: 0,
    goal: 10,
    gain: 1,
    prestigePoints: 0,
    prestiges: 0,

    upgrades: [
        { amount: 0 },
        { amount: 0 },
        { amount: 0 },
        { amount: 0 },
        { amount: 0 },
        { amount: 0 }
    ],

    autoClick: {
        unlocked: false,
        enabled: true
    },

    autoPrestige: {
        unlocked: false,
        enabled: true
    }
};
