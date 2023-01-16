const {fileExtensions} = include('enums');

const exportFiles = (files, directoryPath) => files.reduce((acc, currentValue) => {
    if (currentValue !== 'index.js') {
        const file = `${currentValue.replace(`.${fileExtensions.JS}`, '')}`;
        acc[file] = require(`${directoryPath}/${currentValue}`);
    }
    return acc;
}, {});

module.exports = exportFiles;
