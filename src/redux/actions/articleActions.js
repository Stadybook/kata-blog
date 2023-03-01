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

function catchError() {
    return {
        type: articleError,
    };
}

export function asyncGetArticles(page, token) {
    return (dispatch) => {
        getInfo
            .getArticles(page, token)
            .then((body) => {
                if (body.errors === undefined) {
                    dispatch(getArticles(body));
                } else {
                    dispatch(catchError());
                }
            })
            .catch((e) => {
                if (e.message !== 'Error: 500') {
                    dispatch(catchError());
                    throw new Error(` ${e.message}`);
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

export function asyncGetFullArticle(slug, token) {
    return (dispatch) => {
        getInfo
            .getFullArticle(slug, token)
            .then((body) => {
                if (body.article !== undefined) {
                    dispatch(getFullArticle(body.article));
                } else {
                    dispatch(catchError());
                }
            })
            .catch((e) => {
                dispatch(catchError());
                if (e.message !== 'Error: 500') {
                    throw new Error(`${e.message}`);
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

export function asyncAddArticle(data, token, tags) {
    return (dispatch) => {
        getInfo
            .createArticle(data, token, tags)
            .then((body) => {
                if (body.article !== undefined) {
                    dispatch(addArticle(body));
                } else {
                    dispatch(catchError());
                }
            })
            .catch((e) => {
                dispatch(catchError());
                if (e.message !== 'Error: 500') {
                    throw new Error(`${e.message}`);
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
                    dispatch(catchError());
                }
            })
            .catch((e) => {
                dispatch(catchError());
                if (e.message !== 'Error: 500') {
                    throw new Error(`${e.message}`);
                }
            });
    };
}

export function asyncDeleteArticles(slug, token) {
    return (dispatch) => {
        getInfo
            .deletePost(slug, token)
            .then((body) => {
                if (body.errors) {
                    dispatch(catchError());
                } else {
                    dispatch(articleDelete(body));
                }
            })
            .catch((e) => {
                dispatch(catchError());
                if (e.message !== 'Error: 500') {
                    throw new Error(`${e.message}`);
                }
            });
    };
}

export function asyncLikePost(slug, token) {
    return (dispatch) => {
        getInfo
            .likePost(slug, token)
            .then((body) => {
                if (body.errors) {
                    dispatch(catchError());
                }
            })
            .catch((e) => {
                dispatch(catchError());
                if (e.message !== 'Error: 500') {
                    throw new Error(`${e.message}`);
                }
            });
    };
}

export function asyncDislikePost(slug, token) {
    return (dispatch) => {
        getInfo
            .dislikePost(slug, token)
            .then((body) => {
                if (body.errors) {
                    dispatch(catchError());
                }
            })
            .catch((e) => {
                dispatch(catchError());
                if (e.message !== 'Error: 500') {
                    throw new Error(`${e.message}`);
                }
            });
    };
}
