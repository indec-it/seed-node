const {Router} = require('express');
const logger = require('../../helpers/logger');

module.exports = router => {
    require('fs').readdirSync(__dirname + '/').forEach(file => {
        if (file !== 'index.js') {
            const fileName = file.replace('.js', '');
            const module = require(`./${fileName}`);
            logger.info(`Loading ${fileName} api...`);
            router.use(`/${fileName}`, module(Router()));
        }
    });
    return router;
};
