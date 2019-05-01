const {validationResult} = require('express-validator/check');

function notFound(message = 'Resource not found') {
    return error(message, 404);
}

function forbidden(message = 'Access forbidden') {
    return error(message, 403);
}

function unauthenticated(message = 'Unauthenticated') {
    return error(message, 401);
}

function unprocessable(errors = {}) {
    return error('Unprocessable entity', 422, errors);
}

function error(message = null, status = 500, data = {}) {
    const error = new Error(message);
    error.status = status;
    error.data = data;

    return error;
}

function validate(req) {
    return new Promise((resolve, reject) => {
        const errors = validationResult(req).formatWith(({location, msg, param}) => {
            return {field: param, msg};
        });

        if (errors.isEmpty()) {
            return resolve();
        }

        const formattedErrors = errors.array({
            onlyFirstError: true
        });

        return reject(unprocessable(formattedErrors));
    });
}

module.exports = {
    notFound,
    forbidden,
    unauthenticated,
    unprocessable,
    error,
    validate
};
