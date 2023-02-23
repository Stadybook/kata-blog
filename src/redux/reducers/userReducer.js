/* eslint-disable default-param-last */
import { editAccount, createAccount } from '../actions/types';

const initialState = {
    user: sessionStorage.getItem('user'),
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
        default:
            return state;
    }
};

export default userReducer;
