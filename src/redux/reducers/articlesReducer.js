/* eslint-disable default-param-last */
import { changingPage, loadArticles, newArticle } from '../actions/types';

const initialState = {
    articles: [],
    articlesCount: 0,
    page: 1,
    loading: true,
    // createArticles: [],
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
        case newArticle: //  add article
            return state;
        default:
            return state;
    }
};

export default articlesReducer;
