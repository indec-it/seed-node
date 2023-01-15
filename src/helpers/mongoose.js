const mongoose = require('mongoose') ;
const logger = require('./logger');
const dotenv = require('dotenv');

dotenv.config();

class Mongoose {
    static configure() {
        const {DATABASE_URL} = process.env;
        mongoose.set('strictQuery', false);
        mongoose.Promise = Promise;
        mongoose.connect(DATABASE_URL);
        mongoose.connection.once('open',
            () => logger.info(
                `Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.db.databaseName}`
            )
        );
        mongoose.connection.on('close', () => logger.info('connection closed'));
        mongoose.connection.on('error', err => logger.error(`connection error ${err}`));
    }
}

module.exports = Mongoose;
