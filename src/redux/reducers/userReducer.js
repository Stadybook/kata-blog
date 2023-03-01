/* eslint-disable default-param-last */
import {
    editAccount,
    createAccount,
    logOut,
    deleteUserError,
    userError,
    clean,
    loading,
} from '../actions/types';

const initialState = {
    user: JSON.parse(sessionStorage.getItem('user')),
    userError: null,
    userUpdate: null,
    load: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case createAccount:
            return {
                ...state,
                user: { ...action.payload },
                load: false,
            };
        case editAccount:
            return {
                ...state,
                user: { ...action.payload },
                userUpdate: action.payload,
                load: false,
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
                load: false,
            };
        case deleteUserError:
            return {
                ...state,
                userError: null,
                load: false,
            };
        case clean:
            return {
                ...state,
                userUpdate: null,
                load: false,
            };
        case loading:
            return {
                ...state,
                load: true,
            };

        default:
            return state;
    }
};

export default userReducer;
