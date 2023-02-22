/* eslint-disable import/prefer-default-export */
import { combineReducers } from 'redux';

import articlesReducer from './reducers/articlesReducer';
import signReducer from './reducers/signReducer';

export const rootReducer = combineReducers({
    articlesReducer,
    signReducer,
});
