const Device = require('./Device');
const Biscuit = require('./Biscuit');

class Extruder extends Device {
    constructor() {
        super();
    }
    extrude() {
        if (this.started) {
            return new Biscuit();
        }
        return undefined;
    }
}

module.exports = Extruder;
