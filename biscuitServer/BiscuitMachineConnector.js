const WebSocket = require('ws');
const BiscuitMachine = require('./BiscuitMachine');

class BiscuitMachineConnector {
    constructor(port) {
        this.notifyChange = this.notifyChange.bind(this);

        this.biscuitMachine = new BiscuitMachine(this.notifyChange);
        this.wss = new WebSocket.Server({ port: 8080 });
        this.connections = 0;
        this.intervalFrame = 2000; // ms
        this.interval = undefined;
    }
    start() {
        this.initEvents();
    }
    initEvents() {
        this.wss.on('connection', (ws) => { 
            ws.on('message', (message) => {
                const parsedMsg = JSON.parse(message); // TODO: implement command pattern
                if (parsedMsg.device === 'switch' && this.biscuitMachine.getSwitchStatus() !== parsedMsg.state) {
                    if (parsedMsg.state === 'on') {
                        this.biscuitMachine.start();
                    } else if (parsedMsg.state === 'off') {
                        this.biscuitMachine.stop();
                    } else if (parsedMsg.state === 'pause') {
                        this.biscuitMachine.pause();
                    }
                }
            });
        })
    }
    notifyChange() {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(this.biscuitMachine.buildData());
            }
        })
    }
}

module.exports = BiscuitMachineConnector;