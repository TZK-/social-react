module.exports = {
    express_port: process.env.EXPRESS_PORT || 3000,
    mongodb_uri: process.env.MONGODB_URI || '',
    jwt: {
        secret: process.env.JWT_SECRET || 'eYiyO2BA9uf0XOvbY12dDYGA71nc',
        options: {
            expiresIn: 60 * 60 * 30
        }
    }
};
