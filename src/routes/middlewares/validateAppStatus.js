const validateUserStatus = (req, res, next) => {
    if (process.env.APP_STATUS !== 'live') {
        return res.status(403).send({message: 'You don\'t have permission to perform this action.', code: 403, success: false});
    }
    next();
};

module.exports = validateUserStatus;
