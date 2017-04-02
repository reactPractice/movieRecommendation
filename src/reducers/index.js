import movieInfo from './movieInfo';
import movieRcm from './movieRcm';
import { combineReducers } from 'redux';

const reducers = combineReducers({movieInfo, movieRcm});

export default reducers;