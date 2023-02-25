/* eslint-disable default-param-last */
import { editAccount, createAccount, logOut } from '../actions/types';

const initialState = {
    user: JSON.parse(sessionStorage.getItem('user')),
};

const userReducer = (state = initialState, action) => {
    // console.log(action.payload);
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
            };
        case logOut:
            return {
                ...state,
                user: null,
            };

        default:
            return state;
    }
};

export default userReducer;
