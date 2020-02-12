//This mixin provides access to the gameState variable in the store
export default {
    computed: {
        //Gets the current game state
        gameState() {
            return this.$store.state.gameState;
        }
    },

    methods: {
        //Sets the game state
        setGameState(gameState) {
            this.$store.commit("setGameState", gameState);
        }
    }
}
