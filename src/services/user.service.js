import Api from '../Api'

const endpoint = 'users';

export const create = (params) => {
    return Api.post(endpoint, {}, params);
};

export const getAll = () => {
    return Api.get(endpoint);
};
