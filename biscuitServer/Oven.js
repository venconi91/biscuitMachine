const Device = require('./Device');
const Heater = require('./Heater');
const biscuitStatuses = require('./biscuitStatuses');

const heatingDegreesPerSecond = 20;
const coolingDegreesPerSecond = 10;

class Oven extends Device {
    constructor(minTemp, maxTemp) {
        super();
        this.interval = undefined;
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
        this.currentTemp = 20; // Celsius
        
        this.heater = new Heater();
        this.heater.start();
    }
    start() {
        return this.heater.start()
        .then(() => {
            return new Promise((resolve) => {
                this.interval = setInterval(() => {
                    if (!this.started && this.currentTemp < this.maxTemp) {
                        this.heater.start();
                        this.currentTemp += heatingDegreesPerSecond;
                    } else if (!this.started && this.currentTemp >= this.maxTemp) {
                        super.start();
                        resolve();
                        this.heater.stop();
                        this.currentTemp -= coolingDegreesPerSecond;
                    } else if (this.started && this.currentTemp <= this.minTemp) {
                        resolve();
                        this.heater.start();
                        this.currentTemp += heatingDegreesPerSecond;
                    } else if (this.started) {
                        resolve();
                        this.currentTemp -= coolingDegreesPerSecond;
                    }
                }, 1000)
            }); 
        })
        
    }
    stop() {
        clearInterval(this.interval);

        return super.stop()
            .then(() => {
                return this.heater.stop();
            });
    }
    changeStatus(biscuit) {
        biscuit.setState(biscuitStatuses.BAKED);
    }
    getInfo() {
        let objToReturn = super.getInfo();
        objToReturn.temperature = this.currentTemp;

        return objToReturn;
    }
}

module.exports = Oven;
