const Device = require('./Device');
const biscuitStatuses = require('./biscuitStatuses');

class Stamper extends Device {
    constructor() {
        super();
    }
    changeStatus(biscuit) {
        biscuit.setState(biscuitStatuses.STAMPED);
    }
}

module.exports = Stamper;
