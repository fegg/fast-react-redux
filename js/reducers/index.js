import { combineReducers } from 'redux';
import login from './login';

const reducers = {
    login
};

export default combineReducers({
    ...reducers
});