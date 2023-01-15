const fileExtensions = require('../enums/fileExtensions');

const upperFirstLetter = value => value.charAt(0).toUpperCase() + value.slice(1);

const createPaths = (
    files, firstLetterCapital, sufix, folderName
) => files.reduce((acc, currentValue) => {
    if (!currentValue.includes(`index.${fileExtensions.JS}`)) {
        const fileNameWithUpperCase = `${upperFirstLetter(currentValue.replace(`.${fileExtensions.JS}`, ''))}`;
        const finalFileName = firstLetterCapital
            ? (sufix ? `${fileNameWithUpperCase}${sufix}` : fileNameWithUpperCase)
            : `${currentValue.replace(`.${fileExtensions.JS}`, '')}`;
        acc[finalFileName] = include(`${folderName}/${currentValue}`);
    }
    return acc;
}, {});

module.exports = createPaths;
