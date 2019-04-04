import config from './config';
import axios from "axios";

const token = localStorage.getItem('user') ?
    JSON.parse(localStorage.getItem('user')).token
    : null;

class Api {
    constructor() {
        this.entrypoint = config.api.entrypoint;
        this.token = token;
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.token}`};
    }

    getUrl(endpoint, params = {}) {
        return `${this.entrypoint}/${endpoint}`.replace(/({(.*?)})/g, (match, replace, name) => {
            return params[name] || '';
        });
    }

    get(endpoint, params = {}) {
        return axios.get(this.getUrl(endpoint, params));
    }

    post(endpoint, params = {}, data = {}) {
        return axios.post(this.getUrl(endpoint, params), data);
    }

    put(endpoint, params, data) {
        return axios.put(this.getUrl(endpoint, params), data);
    }

    delete(endpoint, params, data) {
        return axios.delete(this.getUrl(endpoint, params), data);
    }
}

export default new Api();
