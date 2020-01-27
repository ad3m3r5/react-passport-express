import { combineReducers } from 'redux';

import auth from './auth';

const rootReducer = combineReducers({
    a: auth
});

export default rootReducer