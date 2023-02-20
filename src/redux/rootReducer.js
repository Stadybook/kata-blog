/* eslint-disable import/prefer-default-export */
import { combineReducers } from 'redux';

import articlesReducer from './reducers/articlesReducer';

export const rootReducer = combineReducers({
    articlesReducer,
});
