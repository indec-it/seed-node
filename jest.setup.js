global.base_dir = `${__dirname}/src`;

global.abs_path = path => base_dir + path;

global.include = file => require(abs_path('/' + file));
