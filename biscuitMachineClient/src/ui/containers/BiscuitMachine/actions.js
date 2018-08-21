
import * as actionTypes from './actionTypes';

export function sendData(device, state) {
  return {
    type: actionTypes.SEND_DATA,
    message: {
      device,
      state
    }
  };
}

export function receiveData(data) {
  return {
    type: actionTypes.RECEIVE_DATA,
    data
  };
}
