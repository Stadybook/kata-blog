/* eslint-disable default-param-last */
const initialState = {
    sign: 'Sign Up',
};

const signReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'signIn':
            return {
                ...state,
                sign: 'Sign In',
            };
        case 'signUp':
            return {
                ...state,
                sign: 'Sign Up',
            };
        default:
            return state;
    }
};

export default signReducer;
