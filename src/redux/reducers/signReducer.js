/* eslint-disable default-param-last */
import { signUp, signIn, logOut, createArticle } from '../actions/types';

const initialState = {
    sign: '',
};

const signReducer = (state = initialState, action) => {
    switch (action.type) {
        case signIn:
            return {
                ...state,
                sign: 'Sign In',
            };
        case signUp:
            return {
                ...state,
                sign: 'Sign Up',
            };
        case logOut:
            return {
                ...state,
                sign: 'Log Out',
            };
        case createArticle:
            return {
                ...state,
                sign: 'Create article',
            };
        default:
            return state;
    }
};

export default signReducer;
