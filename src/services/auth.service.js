import Api from '../Api'

const storageKey = 'user';

async function login (email, password) {
    const response = await Api.post('auth', {}, {
        email,
        password
    });

    localStorage.setItem(storageKey, JSON.stringify({
        ...response.data.user,
        token: response.data.token
    }));
}

function logout () {
    localStorage.removeItem(storageKey);
}

function getUser() {
    const storage = localStorage.getItem(storageKey);
    if (storage) {
        return JSON.parse(storage);
    }

    return null;
}

function isAuthenticated() {
    return !!getUser();
}

export const authService = {
    login,
    logout,
    isAuthenticated,
    getUser,
};
