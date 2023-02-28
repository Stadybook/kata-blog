import Service from '../../service/Service';

import {
    signIn,
    signUp,
    logOut,
    createAccount,
    editAccount,
    deleteUserError,
    userError,
    clean,
} from './types';

const getInfo = new Service();

export function cleanArr() {
    return {
        type: clean,
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
