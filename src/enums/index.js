const fs = require('fs');

const createPaths = include('helpers/createPaths');

const enums = createPaths(fs.readdirSync(__dirname), false, false, 'enums');

module.exports = enums;
