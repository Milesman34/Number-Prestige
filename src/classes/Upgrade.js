// This class represents an upgrade in the game
export default ({ initialCost, costScaling, amount = 0, boost, costFunction = null } = {}) => ({
    // Initial cost of the upgrade
    initialCost,

    // Cost scaling for the upgrade
    costScaling,

    // Number of times the upgrade has been bought
    amount,

    // Function that determines how powerful the upgrade is
    boost,

    // Optional function that determines the cost of the upgrade
    costFunction,

    // Function that returns the cost of the upgrade
    cost() {
        return this.costFunction === null ? this.initialCost * this.costScaling ** this.amount : this.costFunction();
    },

    // Buys the upgrade
    buy() {
        this.amount++;
    }
})
