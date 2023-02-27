/* eslint-disable default-param-last */
import {
    changingPage,
    loadArticles,
    newArticle,
    loadfullArticle,
    load,
} from '../actions/types';

const initialState = {
    articles: [],
    articlesCount: 0,
    page: 1,
    loading: true,
    fullArticle: null,
    createdArticle: null,
    articleError: false,
};

const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case loadArticles:
            return {
                ...state,
                articles: [...action.payload.articles],
                articlesCount: action.payload.articlesCount,
                loading: false,
                createdArticle: null,
            };
        case changingPage:
            return {
                ...state,
                page: action.payload,
                loading: false,
            };
        case loadfullArticle:
            return {
                ...state,
                fullArticle: action.payload,
                loading: false,
            };
        case load:
            return {
                ...state,
                loading: true,
            };

        case newArticle:
            return {
                ...state,
                createdArticle: action.payload,
                loading: false,
            };
        case ' articles_error':
            return {
                ...state,
                articleError: true,
                loading: false,
            };

        default:
            return state;
    }
};

export default articlesReducer;
