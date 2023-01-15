const fs = require('fs');

const createPaths = include('helpers/createPaths');

const models = createPaths(fs.readdirSync(__dirname), true, false, 'models');

module.exports = models;
