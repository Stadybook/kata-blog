/* eslint-disable default-param-last */
import { changingPage, loadArticles } from '../actions/types';

const initialState = {
    articles: [],
    articlesCount: 0,
    page: 1,
    loading: true,
};

const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case loadArticles:
            return {
                ...state,
                articles: [...action.payload.articles],
                articlesCount: action.payload.articlesCount,
                loading: false,
            };
        case changingPage:
            return {
                ...state,
                page: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default articlesReducer;
