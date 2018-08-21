const Extruder = require('./Extruder');
const Stamper = require('./Stamper');
const Oven = require('./Oven');
const Biscuit = require('./Biscuit');

const minTempForBaking = 220;
const maxTempForBaking = 240;
const switchStateOff = 'off';
const switchStatePaused = 'paused';
const switchStateOn = 'on'

class BiscuitMachine {
    constructor(notifyChangeCallBack) { // TODO: think about passing the devices in the constructor
        this.notifyChangeCallBack = notifyChangeCallBack;
        this.intervalFrame = 2000;
        this.switchStatus = switchStateOff;
        this.interval = undefined;
        this.maxBiscuitsOnConveyor = 6;
        this.biscuits = new Array(this.maxBiscuitsOnConveyor).fill(undefined);
        this.shouldDrain = false;
        this.extruder = new Extruder();
        this.stamper = new Stamper();
        this.oven = new Oven(minTempForBaking, maxTempForBaking);
        this.biscuitTransitionIndex = {
            1: this.stamper,
            3: this.oven
        }

        this.readyBiscuits = 0;
    }
    start() {
        this.shouldDrain = false;

        return this.oven.start()
        .then(() => {
            return this.stamper.start();
        })
        .then(() => {
            return this.extruder.start();
        })
        .then(() => {
            this.initInterval();
            this.switchStatus = switchStateOn;
        })
    }
    stop() {
        Promise.all([this.extruder.stop(), this.extruder.stop()])
        .then(() => {
            this.shouldDrain = true;
            if (!this.interval && this.getFilteredBiscuitsCount()) {
                this.initInterval();
            }
        })
    }
    getFilteredBiscuitsCount() {
        return this.biscuits.filter(b => b).length;
    }
    pause() {
        Promise.all([this.extruder.stop(), this.extruder.stop()])
        .then(() => {
            this.stopInterval();
            this.switchStatus = switchStatePaused;
            this.notifyChangeCallBack();
        })
    }
    initInterval() {
        this.interval = setInterval(() => {
            this.update();
        }, this.intervalFrame)
    }
    update() {
        if (this.extruder.getState()) {
            this.biscuits.unshift(this.extruder.extrude());
        }

        if (this.biscuits.length > this.maxBiscuitsOnConveyor) {
            if (this.biscuits.pop()) {
                this.readyBiscuits++;
            }
        }

        Object.keys(this.biscuitTransitionIndex).forEach((key) => {
            const currentBiscuit = this.biscuits[key];
            if (currentBiscuit) {
                this.biscuitTransitionIndex[key].changeStatus(currentBiscuit);
            }
        })

        if (this.shouldDrain) {
            const biscuitsOnConveyor = this.getFilteredBiscuitsCount();
            if (biscuitsOnConveyor) {
                const popedBiscuit = this.biscuits.pop();
                this.biscuits.unshift(undefined); // keep the size of the biscuits constant after the pop
                if (popedBiscuit) {
                    this.readyBiscuits++;
                }
            } else {
                this.stopInterval();
                this.shouldDrain = false;
                this.oven.stop();
                this.switchStatus = switchStateOff;
            }
            
        }
        this.notifyChangeCallBack();
    }
    stopInterval() {
        clearInterval(this.interval);
        this.interval = undefined;
    }
    getSwitchStatus() {
        return this.switchStatus;
    }
    buildData() {
        // TODO: think about builder pattern
        const buildObj = {
            conveyorBiscuits: this.biscuits.map(b => b ? b.getInfo(): b),
            switchState: this.switchStatus,
            oven: this.oven.getInfo(),
            extruder: this.extruder.getInfo(),
            stamper: this.stamper.getInfo(),
            ready: this.readyBiscuits
        };
        return JSON.stringify(buildObj);
    }
}

module.exports = BiscuitMachine;
