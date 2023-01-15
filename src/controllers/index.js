const fs = require('fs');

const createPaths = include('helpers/createPaths');

module.exports = createPaths(fs.readdirSync(__dirname), true, 'Controller', 'controllers');
