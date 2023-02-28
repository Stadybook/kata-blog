/* eslint-disable no-unused-vars */
import Service from '../../service/Service';

import {
    loadArticles,
    loadfullArticle,
    changingPage,
    createArticle,
    newArticle,
    load,
    clean,
    deleteArticle,
    articleError,
} from './types';

const getInfo = new Service();

export function makeLoad() {
    return {
        type: load,
    };
}

export function articleCreate() {
    return {
        type: createArticle,
    };
}

export function cleanArr() {
    return {
        type: clean,
    };
}

function articleDelete() {
    return {
        type: deleteArticle,
    };
}

function getArticles(payload) {
    return {
        type: loadArticles,
        payload,
    };
}

export function asyncGetArticles(page) {
    return (dispatch) => {
        getInfo
            .getArticles(page)
            .then((body) => {
                dispatch(getArticles(body));
            })
            .catch((e) => {
                if (e.message !== 'Error: 500') {
                    throw new Error(`Service ${e.message}`);
                }
            });
    };
}

function getFullArticle(payload) {
    return {
        type: loadfullArticle,
        payload,
    };
}

export function asyncGetFullArticle(slug) {
    return (dispatch) => {
        getInfo
            .getFullArticle(slug)
            .then((body) => {
                dispatch(getFullArticle(body));
            })
            .catch((e) => {
                if (e.message !== 'Error: 500') {
                    throw new Error(`Service ${e.message}`);
                }
            });
    };
}

export function changePage(payload) {
    return {
        type: changingPage,
        payload,
    };
}

function addArticle(payload) {
    return {
        type: newArticle,
        payload,
    };
}

function catchError(payload) {
    return {
        type: articleError,
        payload,
    };
}

export function asyncAddArticle(data, token, tags) {
    return (dispatch) => {
        getInfo
            .createArticle(data, token, tags)
            .then((body) => {
                if (body.article !== undefined) {
                    dispatch(addArticle(body));
                } else {
                    dispatch(catchError(body.errors));
                }
            })
            .catch((e) => {
                if (e.message !== 'Error: 500') {
                    throw new Error(`Service ${e.message}`);
                }
            });
    };
}

export function asyncUpdateArticle(data, slug, token, tags) {
    return (dispatch) => {
        getInfo
            .updateArticle(data, slug, token, tags)
            .then((body) => {
                if (body.article !== undefined) {
                    dispatch(addArticle(body));
                } else {
                    dispatch(catchError(body.errors));
                }
            })
            .catch((e) => {
                if (e.message !== 'Error: 500') {
                    throw new Error(`Service ${e.message}`);
                }
            });
    };
}

export function asyncDeleteArticles(slug, token) {
    return (dispatch) => {
        getInfo
            .deleteArticle(slug, token)
            .then((body) => {
                if (body === undefined) {
                    dispatch(articleDelete(body));
                } else {
                    dispatch(catchError(body));
                }
            })
            .catch((e) => {
                if (e.message !== 'Error: 500') {
                    throw new Error(`Service ${e.message}`);
                }
            });
    };
}

export function asyncLikePost(slug, token) {
    return (dispatch) => {
        getInfo
            .likePost(slug, token)
            .then((body) => {
                // dispatch(addArticle(body));
            })
            .catch((e) => {
                if (e.message !== 'Error: 500') {
                    throw new Error(`Service ${e.message}`);
                }
            });
    };
}

export function asyncDislikePost(slug, token) {
    return (dispatch) => {
        getInfo
            .dislikePost(slug, token)
            .then((body) => {
                // dispatch(addArticle(body));
            })
            .catch((e) => {
                if (e.message !== 'Error: 500') {
                    throw new Error(`Service ${e.message}`);
                }
            });
    };
}
