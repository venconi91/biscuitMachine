import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Conveyor from './../../components/Conveyor';
import Extruder from './../../components/Etruder';
import Stamper from './../../components/Stamper';
import Oven from './../../components/Oven';
import Motor from './../../components/Motor';
import Switch from './../../components/Switch';
import Basket from './../../components/Basket';

import { sendData, receiveData } from './actions';
import style from './style.css';

class BiscuitMachine extends Component {
  constructor(props) {
    super(props);
    this.onSwitchStateChange = this.onSwitchStateChange.bind(this);
  }
  componentDidMount() {
    const { wsUrl } = this.props;
    const ws = new WebSocket(wsUrl);
    this.ws = ws;

    ws.onmessage = (event) => {
      console.log(`data received: ${event.data}`);
      this.props.receiveData(JSON.parse(event.data));
    };
    ws.onopen = () => {
      this.wsOpen = true;
    };
    ws.onerror = (event) => {
      console.log(event);
    };
  }
  onSwitchStateChange(newState) {
    const msgToSend = JSON.stringify({
      device: 'switch',
      state: newState
    });

    if (this.wsOpen) {
      console.log(`data send: ${msgToSend}`);
      this.ws.send(msgToSend);
    }
  }
  render() {
    const { machineState } = this.props;
    return (
      <div>
        <div className={style.topDevices}>
          <Extruder />
          <Stamper />
          <Oven temperature={machineState.oven.temperature} />
        </div>
        <Conveyor biscuits={machineState.conveyorBiscuits} />
        <div className={style.bottomDevices}>
          <Motor />
          <Switch state={machineState.switchState} onSwitchChange={this.onSwitchStateChange} />
          <Basket readyBiscuits={machineState.ready} />
        </div>
      </div>
    );
  }
}

BiscuitMachine.propTypes = {
  wsUrl: PropTypes.string.isRequired,
  machineState: PropTypes.object.isRequired,
  receiveData: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    wsUrl: state.biscuitMachine.get('wsUrl'),
    machineState: state.biscuitMachine.get('machineState').toJS()
  };
}

export default connect(
  mapStateToProps,
  { sendData, receiveData }
)(BiscuitMachine);
