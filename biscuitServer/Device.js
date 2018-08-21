class Device {
    constructor() {
        this.started = false;
    }
    start() {
        this.started = true;
        return Promise.resolve(true);
    }
    stop() {
        this.started = false;
        return Promise.resolve(true);
    }
    getState() {
        return this.started;
    }
    getInfo() {
        return {
            started: this.started
        };
    }
}

module.exports = Device;