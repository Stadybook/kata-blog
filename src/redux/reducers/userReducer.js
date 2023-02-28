/* eslint-disable default-param-last */
import {
    editAccount,
    createAccount,
    logOut,
    deleteUserError,
    userError,
    clean,
} from '../actions/types';

const initialState = {
    user: JSON.parse(sessionStorage.getItem('user')),
    userError: null,
    userUpdate: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case createAccount:
            return {
                ...state,
                user: { ...action.payload },
            };
        case editAccount:
            return {
                ...state,
                user: { ...action.payload },
                userUpdate: action.payload,
            };
        case logOut:
            return {
                ...state,
                user: null,
            };
        case userError:
            return {
                ...state,
                userError: action.payload,
            };
        case deleteUserError:
            return {
                ...state,
                userError: null,
            };
        case clean:
            return {
                ...state,
                userUpdate: null,
            };

        default:
            return state;
    }
};

export default userReducer;
