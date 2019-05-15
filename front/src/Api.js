import config from './config';
import axios from "axios";

class Api {
    constructor() {
        this.entrypoint = config.api.entrypoint;
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
