import { combineReducers } from 'redux';
import allReducers from './allReducers';

const reducers = combineReducers(allReducers);

export default reducers;
