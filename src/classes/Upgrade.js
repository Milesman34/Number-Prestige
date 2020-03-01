// This class represents an upgrade in the game
export default ({ cost, scaling, amount = 0, boost } = {}) => ({
    // Function that calculates the cost of the upgrade
    cost,

    // Number of times the upgrade has been bought
    amount,

    // Function that determines how powerful the upgrade is
    boost,

    // Buys the upgrade
    buy() {
        this.amount++;
    }
})
