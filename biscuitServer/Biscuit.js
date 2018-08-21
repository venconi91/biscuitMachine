const biscuitStatuses = require('./biscuitStatuses');

class Biscuit {
    constructor() {
        this.state = biscuitStatuses.EXTRUDED;
    }
    getState() {
        return this.state;
    }
    setState(newState) {
        this.state = newState;
    }
    getInfo() {
        return {
            state: this.getState()
        };
    }
}

module.exports = Biscuit;