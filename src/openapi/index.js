const pkg = require('../../package.json');
const publicApi = require('./publicApi');
const components = require('./components');

module.exports = {
    openapi: '3.0.2',
    info: {
        title: pkg.description,
        version: pkg.version
    },
    servers: [
        {url: 'http://localhost:6022', description: 'Local dev server'}
    ],
    security: [
        {bearerAuth: []}
    ],
    paths: {
        '/ping': {
            get: {
                description: 'Endpoint ping',
                operationId: 'ping',
                security: [],
                responses: {
                    200: {
                        description: 'Success',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {version: {type: 'string'}}
                                }
                            }
                        }
                    },
                    default: {
                        description: 'Error',
                        content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                    }
                }
            }
        },
        '/ready': {
            get: {
                operationId: 'getStatus',
                security: [],
                responses: {
                    200: {
                        description: 'Success',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: {type: 'string'},
                                        status: {type: 'string'},
                                        deps: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    default: {
                        description: 'Error',
                        content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                    }
                }
            }
        },
        '/health': {
            get: {
                operationId: 'getHealth',
                security: [],
                responses: {
                    200: {
                        description: 'Success',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: {type: 'string'},
                                        status: {type: 'string'}
                                    }
                                }
                            }
                        }
                    },
                    default: {
                        description: 'Error',
                        content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                    }
                }
            }
        },
        '/status': {
            get: {
                operationId: 'getAppStatus',
                security: [],
                responses: {
                    200: {
                        description: 'Success',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: {type: 'string'}
                                    }
                                }
                            }
                        }
                    },
                    default: {
                        description: 'Error',
                        content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                    }
                }
            }
        },
        ...publicApi
    },
    components
};
