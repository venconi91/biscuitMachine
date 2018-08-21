import React, { Component } from 'react';

// const WebSocket = require('ws');
import BiscuitMachineContainer from './../containers/BiscuitMachine';

class BiscuitMachine extends Component {
  componentDidMount() {
    // const ws = new WebSocket('ws://localhost:8080');
    // ws.onmessage = function (event) {
    //   debugger;
    //   console.log(event.data);
    // };
    // ws.onopen = function (event) {
    //   debugger;
    //   ws.send("Here's some text that the server is urgently awaiting!");
    // };
  }
  render() {
    return (
      <div>
        <h2>Biscuit Machine</h2>
        <BiscuitMachineContainer />
      </div>
    );
  }
}

export default BiscuitMachine;
