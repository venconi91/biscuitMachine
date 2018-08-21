import immutable from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = immutable.fromJS({
  wsUrl: 'ws://localhost:8080',
  machineState: {
    conveyorBiscuits: [],
    switchState: 'off',
    oven: {
      state: 'started',
      temperature: undefined
    },
    extruder: {
      started: false
    },
    stamper: {
      started: false
    },
    ready: 0
  }
});

export function biscuitMachine(state = defaultState, action) {
  if (action.type === actionTypes.SEND_DATA) {
    return state
      .set('sendMessageIndex', state.get('sendMessageIndex') + 1)
      .setIn(['message', 'device'], action.message.device)
      .setIn(['message', 'state'], action.message.state);
  } else if (action.type === actionTypes.RECEIVE_DATA) {
    return state
      .set('machineState', immutable.fromJS(action.data));
  }
  return state;
}

export default biscuitMachine;
