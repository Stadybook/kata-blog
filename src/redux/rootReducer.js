/* eslint-disable import/prefer-default-export */
import { combineReducers } from 'redux';

import articlesReducer from './reducers/articlesReducer';
import userReducer from './reducers/userReducer';

export const rootReducer = combineReducers({
    articlesReducer,
    userReducer,
});
