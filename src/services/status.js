const mongoose = require('mongoose');
const pkg = require('../../package.json');

const generateStatus = (deps, optionalDeps = []) => ({
    deps: [...deps, ...optionalDeps].flat(),
    name: pkg.name,
    status: deps.every(dependency => dependency.status === 'ok')
        ? optionalDeps.every(optionalDependency => optionalDependency.status === 'ok') ? 'ok' : 'degraded'
        : 'down'
});

class StatusService {
    static getStatus() {
        return generateStatus([StatusService.getMongoDBStatus()]);
    }

    static getHealth() {
        return StatusService.getMongoDBStatus();
    }

    static getMongoDBStatus() {
        const connected = mongoose.connection.readyState === 1;
        return {name: 'MongoDB', status: connected ? 'ok' : 'down'};
    }
}

module.exports = StatusService;
