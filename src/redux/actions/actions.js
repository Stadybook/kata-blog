/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import Service from '../../service/Service';

import {
    loadArticles,
    loadfullArticle,
    changingPage,
    signIn,
    signUp,
    logOut,
    createArticle,
    createAccount,
    editAccount,
    newArticle,
    deleteUserError,
    userError,
} from './types';

const getInfo = new Service();

export function makeLoad() {
    return {
        type: 'loading',
    };
}

export function accountLogin() {
    return {
        type: signIn,
    };
}

export function accountCreate() {
    return {
        type: signUp,
    };
}

export function accountLoginOut() {
    sessionStorage.removeItem('user');
    return {
        type: logOut,
    };
}

export function cleanUserError() {
    return {
        type: deleteUserError,
    };
}

export function articleCreate() {
    return {
        type: createArticle,
    };
}
/* export function cleanArr(){
    return{
        type:'clean_arr'
    }
} */

function articleDelete() {
    return {
        type: 'delete_article',
    };
}

export function asyncDeleteArticles(slug, token) {
    return (dispatch) => {
        getInfo
            .deleteArticle(slug, token)
            .then((body) => {
                dispatch(articleDelete(body));
            })
            .catch((e) => {
                if (e.message !== 'Error: 500') {
                    throw new Error(`Service ${e.message}`);
                }
            });
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

function getUserError(payload) {
    return {
        type: userError,
        payload,
    };
}

function createUser(payload) {
    return {
        type: createAccount,
        payload,
    };
}

export function asyncCreateUser(data) {
    return (dispatch) => {
        getInfo
            .postUser(data)
            .then((body) => {
                if (body.user !== undefined) {
                    sessionStorage.setItem('user', JSON.stringify(body.user));
                    dispatch(createUser(body.user));
                } else {
                    dispatch(getUserError(body.errors));
                }
            })
            .catch((e) => {
                if (e.message !== 'Error: 500') {
                    throw new Error(`Service ${e.message}`);
                }
            });
    };
}

function logIn(payload) {
    return {
        type: createAccount,
        payload,
    };
}

export function asyncLogIn(data) {
    return (dispatch) => {
        getInfo
            .userLogin(data)
            .then((body) => {
                if (body.user !== undefined) {
                    sessionStorage.setItem('user', JSON.stringify(body.user));
                    dispatch(logIn(body.user));
                } else {
                    dispatch(getUserError(body.errors));
                }
            })
            .catch((e) => {
                if (e.message !== 'Error: 500') {
                    throw new Error(`Service ${e.message}`);
                }
            });
    };
}

function editProfile(payload) {
    return {
        type: editAccount,
        payload,
    };
}

export function asyncEditProfile(data, token) {
    return (dispatch) => {
        getInfo
            .updateUser(data, token)
            .then((body) => {
                if (body.user !== undefined) {
                    sessionStorage.setItem('user', JSON.stringify(body.user));
                    dispatch(editProfile(body.user));
                } else {
                    dispatch(getUserError(body.errors));
                }
            })
            .catch((e) => {
                if (e.message !== 'Error: 500') {
                    throw new Error(`Service ${e.message}`);
                }
            });
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
                dispatch(addArticle(body));
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
                // dispatch(addArticle(body));
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
