/* eslint-disable default-param-last */
import {
    changingPage,
    loadArticles,
    newArticle,
    loadfullArticle,
    load,
    deleteArticle,
    articleError,
} from '../actions/types';

const initialState = {
    articles: [],
    articlesCount: 0,
    page: 1,
    loading: true,
    fullArticle: null,
    articleResponse: null,
    articlesError: false,
};

const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case loadArticles:
            return {
                ...state,
                articles: [...action.payload.articles],
                articlesCount: action.payload.articlesCount,
                loading: false,
                articleResponse: null,
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
                articleResponse: action.payload,
                loading: false,
            };
        case articleError:
            return {
                ...state,
                articlesError: true,
                loading: false,
            };
        case deleteArticle:
            return {
                ...state,
                articleResponse: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default articlesReducer;
