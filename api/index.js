const config = require('./config');

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', routes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

app.listen(config.express_port, function () {
    console.log('Example app listening on port http://localhost:' + config.express_port);
});

mongoose.connect(config.mongodb_uri, {
    useCreateIndex: true,
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;
