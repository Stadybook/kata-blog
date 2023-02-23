/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const baseURL = 'https://blog.kata.academy/api/';
export default class Service {
    async makeRequest(url) {
        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error('invalid responce', res.status);
            }
            const body = await res.json();
            return body;
        } catch (e) {
            throw new Error(e);
        }
    }

    getArticles = async (page) => {
        const url = `${baseURL}articles?limit=5&offset=${(page - 1) * 5}`;
        const body = await this.makeRequest(url);
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
            return data.user;
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
            return data.user;
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
            return data.user;
        } catch (e) {
            throw new Error(`Service ${e.message}`);
        }
    };
}
