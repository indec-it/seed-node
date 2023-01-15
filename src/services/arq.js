const {stringify} = require('querystring');
const superagent = require('superagent');

const {
    AUTH_ENDPOINT,
    AUTH_CLIENT_ID,
    AUTH
} = process.env;

const OAUTH_API = `${AUTH_ENDPOINT}oauth/`;

class ArqService {
    async validateToken(bearerToken) {
        try {
            const token = bearerToken.replace('Bearer ', '');
            const response = await superagent.post(`${OAUTH_API}token`)
                .send({
                    token,
                    grant_type: 'client_credentials'
                })
                .set('content-type', 'application/json')
                .set('credentials', 'same-origin')
                .set('clientId', AUTH_CLIENT_ID);
            return JSON.parse(response.text);
        } catch (err) {
            throw Error(err);
        }
    }

    async getFromArch(token, route, filters) {
        try {
            const routeWithFilters = filters ?
                `${route}?${stringify(filters)}` : route;
            const response = await superagent
                .get(`${OAUTH_API}${routeWithFilters}`)
                .set('content-type', 'application/json')
                .set('credentials', 'same-origin')
                .set('clientId', AUTH_CLIENT_ID)
                .set('redirectUri', AUTH)
                .set('Authorization', token);
            return JSON.parse(response.text);
        } catch (err) {
            throw Error(err);
        }
    }

    async putFromArch(token, route, body) {
        try {
            const response = await superagent
                .put(`${OAUTH_API}${route}`)
                .send(body)
                .set('content-type', 'application/json')
                .set('credentials', 'same-origin')
                .set('clientId', AUTH_CLIENT_ID)
                .set('redirectUri', AUTH)
                .set('Authorization', token);
            return JSON.parse(response.text);
        } catch (err) {
            throw Error(err);
        }
    }

    fetchUsers(token, filters) {
        return this.getFromArch(token, 'users', filters);
    }

    fetchUser(id, token) {
        return this.getFromArch(token, 'users', {id});
    }

    getAppRoles(token) {
        return this.getFromArch(token, 'roles');
    }
}

module.exports = new ArqService();
