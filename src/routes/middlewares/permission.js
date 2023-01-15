const castArray = values => Array.isArray(values) ? values : [values];

const permissionMiddleware = roles =>
    (req, res, next) => {
        if (!roles || castArray(roles).every(role => req.user.role !== role)) {
            return res.status(403).send({message: 'You don\'t have permission to perform this action.', code: 403, success: false});
        }
        next();
    };

module.exports = permissionMiddleware;
