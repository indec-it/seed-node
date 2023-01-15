const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');

const logger = require('./helpers/logger');
const Router = require('./routes');
const packageJson = require('../package.json');
const Mongoose = require('./helpers/mongoose');
const {
    API_DOCS_ENABLED, BODY_LIMIT, NODE_ENV, PORT, APP_URL, CORS_ENABLED
} = process.env;

class App {
    constructor() {
        this.app = express();
    }

    test() {
        this.app.use(express.json({limit: BODY_LIMIT}));
        this.app.use(express.urlencoded({extended: true}));
        this._routes();
        return this.app;
    }

    _onListening() {
        if(NODE_ENV !== 'test') {
            logger.info(`Started ${packageJson.name} at port ${PORT} in ${NODE_ENV} environment`);
        }
    }

    _onError(err) {
        logger.error(`App Crashed, Error: ${err.errorMessage}`);
        process.exit;
    }

    async init() {
        await this._configure();
        this.app.listen(PORT, this._onListening);
        this.app.on('error', this._onError);
        return this.app;
    }

    _configure() {
        Mongoose.configure();
        this._middlewares();
        return this._routes();
    }

    _middlewares() {
        this.app.use(express.json({limit: BODY_LIMIT}));
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cookieParser());
        if (NODE_ENV !== 'test') {
            this.app.use(function (req, res, next){
                res.on('finish', () => logger.info(`${req.method} ${req.url} ${res.statusCode}`));
                next();
            });
        }
        if (NODE_ENV === 'development') {
            this.app.use(cors({
                credentials: true,
                origin: /^http:\/\/localhost/
            }));
        }
        const corsOptions = {
            origin: function (origin, callback) {
                if (APP_URL === origin) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            }
        };
        if (NODE_ENV === 'production' && CORS_ENABLED === 'true') {
            this.app.use(cors(corsOptions));
        }
    }

    _routes() {
        const apiSpec = require('./openapi');

        if (API_DOCS_ENABLED === 'true') {
            const options = {swaggerOptions: {validatorUrl: null}};
            this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSpec, options));
        }
        this.app.use(OpenApiValidator.middleware({
            apiSpec,
            validateRequests: true,
            validateResponses: true
        }));
        Router.configure(this.app);
    }
}

module.exports = App;
