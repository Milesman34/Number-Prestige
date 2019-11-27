//Represents an upgrade in the game
const Upgrade = ({id, cost, costMulti, boost, currently, repeatable = true} = {}) => {
    let obj = {
        //ID of HTML element
        id,

        //Default cost
        defaultCost: cost,

        //Cost and cost multiplier
        cost,
        costMulti,

        //Is the upgrade repeatable
        repeatable,

        //Amount of the upgrade
        amount: 0,

        //Function that calculates the upgrade's boost
        boost,

        //Function that determines how the currently section is rendered
        currently,

        //Checks if the player can buy the upgrade
        get canBuy() {
            return this.repeatable || this.amount === 0;
        },

        //Updates the boost shown on the element
        updateBoost() {
            //The 2nd child is the currently element
            $(`#${this.id}`).children().eq(1).text(`Currently: ${this.currently(formatSci(this.boost()))}`)
        },

        //Buys the upgrade,
        buy() {
            this.amount++;

            this.updateBoost();

            //Cost is multiplied if it is repeatable
            if (this.repeatable)
                this.cost *= this.costMulti;
        }
    };

    return obj;
}
