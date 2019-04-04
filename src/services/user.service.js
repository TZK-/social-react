import Api from '../Api'

const endpoint = 'users';

async function create (params) {
    return Api.post(endpoint, {}, params);
}

async function getAll() {
    return Api.get(endpoint);
};

export const userService = {
    create,
    getAll
};
