function notFound(message = 'Resource not found') {
    return error(message, 404);
}

function forbidden(message = 'Access forbidden') {
    return error(message, 403);
}

function unauthenticated(message = 'Unauthenticated') {
    return error(message, 401);
}

function unprocessable(message = '') {
    return error(message, 422);
}

function error(message = null, status = 500) {
    const error = new Error(message);
    error.status = status;

    return error;
}

module.exports = {
    notFound,
    forbidden,
    unauthenticated,
    unprocessable,
    error
};
