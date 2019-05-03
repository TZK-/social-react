const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const {notFound} = require("./helpers");
const {passport} = require('./passport');
const routes = require('./routes');
const app = express();
const http = require('http').Server(app);

app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));
app.use(passport.initialize());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', routes);

app.use((req, res, next) => {
    next(notFound());
});

app.use((err, req, res, next) => {
    if (!err) return next();

    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
            data: err.data,
            code: err.status
        }
    });
});

const socket = require('./socket/index')(http);
require('./socket/listeners')(socket);

http.listen(config.express_port, () => {
    console.log('Example app listening on *:' + config.express_port);
});

mongoose.connect(config.mongodb_uri, {
    useCreateIndex: true,
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;
