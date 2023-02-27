/* eslint-disable default-param-last */
import {
    changingPage,
    loadArticles,
    newArticle,
    loadfullArticle,
} from '../actions/types';

const initialState = {
    articles: [],
    articlesCount: 0,
    page: 1,
    loading: true,
    fullArticle: null,
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
        case loadfullArticle:
            return {
                ...state,
                fullArticle: action.payload,
                loading: false,
            };
        case 'loading':
            return {
                ...state,
                loading: true,
            };
        /* case 'clean_arr':
            return {
                ...state,
                articles: [],
            }; */
        case newArticle: //  add article
            return state;
        default:
            return state;
    }
};

export default articlesReducer;
