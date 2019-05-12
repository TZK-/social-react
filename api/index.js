const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const {notFound} = require("./helpers");
const {passport} = require('./passport');
const routes = require('./routes');
const app = require('./app');
const http = require('./server');
const io = require('./socket/index');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(cors());
app.use(passport.initialize());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

require('./socket/listeners')(io);

http.listen(config.express_port, () => {
    console.log('Example app listening on *:' + config.express_port);
});

mongoose.connect(config.mongodb_uri, {
    useCreateIndex: true,
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;
