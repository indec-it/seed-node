const base_dir = __dirname;

const abs_path = function(path) {
    return base_dir + path;
};

global.include = function(file) {
    return require(abs_path('/' + file));
};

const Logger = include('helpers/logger');

Logger.info('Global vars loaded');
