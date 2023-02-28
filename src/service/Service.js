/* eslint-disable class-methods-use-this */
const baseURL = 'https://blog.kata.academy/api/';
export default class Service {
    getArticles = async (page, token) => {
        try {
            const url = `${baseURL}articles?limit=5&offset=${(page - 1) * 5}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            return data;
        } catch (e) {
            throw new Error(`Service ${e.message}`);
        }
    };

    getFullArticle = async (slug, token) => {
        try {
            const url = `${baseURL}articles/${slug}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            return data;
        } catch (e) {
            throw new Error(`Service ${e.message}`);
        }
    };

    deletePost = async (slug, token) => {
        const url = `${baseURL}articles/${slug}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('invalid responce', response.status);
        }
        const body = await response;
        return body;
    };

    postUser = async ({ username, email, password }) => {
        try {
            const url = `${baseURL}users`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: {
                        username,
                        email,
                        password,
                    },
                }),
            });

            const data = await response.json();
            return data;
        } catch (e) {
            throw new Error(`Service ${e.message}`);
        }
    };

    userLogin = async ({ email, password }) => {
        try {
            const url = `${baseURL}users/login`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: {
                        email,
                        password,
                    },
                }),
            });

            const data = await response.json();
            return data;
        } catch (e) {
            throw new Error(`Service ${e.message}`);
        }
    };

    updateUser = async (user, token) => {
        const { username, email, password, image } = user;
        try {
            const url = `${baseURL}user`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user: {
                        email,
                        password,
                        username,
                        image,
                    },
                }),
            });

            const data = await response.json();
            return data;
        } catch (e) {
            throw new Error(`Service ${e.message}`);
        }
    };

    createArticle = async (article, token, tagList) => {
        const { title, description, body } = article;
        try {
            const url = `${baseURL}articles`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    article: {
                        title,
                        description,
                        body,
                        tagList,
                    },
                }),
            });
            const data = await response.json();
            return data;
        } catch (e) {
            throw new Error(`Service ${e.message}`);
        }
    };

    updateArticle = async (article, slug, token, tagList) => {
        const { title, description, body } = article;
        try {
            const url = `${baseURL}articles/${slug}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    article: {
                        title,
                        description,
                        body,
                        tagList,
                    },
                }),
            });

            const data = await response.json();
            return data;
        } catch (e) {
            throw new Error(`Service ${e.message}`);
        }
    };

    likePost = async (slug, token) => {
        try {
            const url = `${baseURL}articles/${slug}/favorite`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            return data;
        } catch (e) {
            throw new Error(`Service ${e.message}`);
        }
    };

    dislikePost = async (slug, token) => {
        try {
            const url = `${baseURL}articles/${slug}/favorite`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            return data;
        } catch (e) {
            throw new Error(`Service ${e.message}`);
        }
    };
}
