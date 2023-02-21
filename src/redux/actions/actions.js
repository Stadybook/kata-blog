/* eslint-disable import/prefer-default-export */
import Service from '../../service/Service';

import { loadArticles, changingPage } from './types';

const getInfo = new Service();

export function getArticles(payload) {
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

export function changePage(payload) {
    return {
        type: changingPage,
        payload,
    };
}
