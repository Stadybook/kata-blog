/* eslint-disable default-param-last */
const initialState = {
    articles: [],
    articlesCount: 0,
    page: 1,
};

const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'load_articles':
            return {
                ...state,
                articles: [...action.payload.articles],
                articlesCount: action.payload.articlesCount,
            };
        case 'change_page':
            return {
                ...state,
                page: action.payload,
            };
        default:
            return state;
    }
};

export default articlesReducer;
