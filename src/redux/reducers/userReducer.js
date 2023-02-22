/* eslint-disable default-param-last */
const initialState = {
    user: null,
};

const userReducer = (state = initialState, action) => {
    console.log(action.payload);
    switch (action.type) {
        case 'create_user':
            return {
                ...state,
                user: { ...action.payload },
            };
        default:
            return state;
    }
};

export default userReducer;
