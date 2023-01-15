module.exports = {
    type: 'object',
    properties: {
        success: {type: 'boolean'},
        user: {$ref: '#/components/schemas/User'}
    }
};
