/* eslint-disable import/prefer-default-export */
import Service from '../../service/Service';

const getInfo = new Service();

export function getArticles(payload) {
    return {
        type: 'load_articles',
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
                    throw new Error('Service Error: 500');
                }
            });
    };
}

export function changePage(payload) {
    return {
        type: 'change_page',
        payload,
    };
}
