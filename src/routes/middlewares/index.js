const fs = require('fs');

const exportFiles = include('helpers/exportFiles');

module.exports = exportFiles(fs.readdirSync(__dirname), __dirname);
