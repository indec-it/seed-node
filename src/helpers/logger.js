const winston = require('winston');
const fs = require('fs');
const packageJson = require('../../package.json');

const {
    createLogger,
    format: {
        combine,
        timestamp,
        printf,
        colorize,
        align
    },
    transports: {
        Console, Stream
    }
} = winston;

const myCustomLevels = {
    levels: {
        error: 0,
        info: 2,
        debug: 1
    },
    colors: {
        error: 'red',
        info: 'green',
        debug: 'yellow'
    }
};

const customFormat = printf(info =>
    `[${info.level} ${new Date(info.timestamp).toLocaleString()}] ${info.message}`
);

winston.addColors(myCustomLevels.colors);

const format = combine(
    timestamp(),
    align(),
    colorize({ all: true }),
    customFormat
);

const getTransports = () => {
    const transportOpts = [
        (new Console({
            level: 'info',
            colorize: true
        }))
    ];

    if (process.env.NODE_ENV === 'production') {
        transportOpts.push(
            new Stream({
                format,
                stream: fs.createWriteStream(`/tmp/${packageJson.name.replace('-', '_')}_info.log`,
                    {
                        encoding: 'utf8',
                        flags: 'a'
                    })
            })
        );
        transportOpts.push(
            new Stream({
                level: 'error',
                format,
                stream: fs.createWriteStream(`/tmp/${packageJson.name.replace('-', '_')}_error.log`,
                    {
                        encoding: 'utf8',
                        flags: 'a'
                    }
                )
            })
        );
    }

    return transportOpts;
};

const logger = createLogger({
    format,
    levels: myCustomLevels.levels,
    transports: getTransports()
});

module.exports = logger;
