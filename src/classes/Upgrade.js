// This class represents an upgrade in the game
export default ({ cost, scaling, amount = 0, boost } = {}) => ({
    // Cost of the upgrade
    cost,

    // Amount the upgrade's cost increases on purchase
    scaling,

    // Number of times the upgrade has been bought
    amount,

    // Function that determines how powerful the upgrade is
    boost,

    // Buys the upgrade
    buy() {
        this.amount++;
        this.cost *= this.scaling;
    }
})
