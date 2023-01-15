const {errorMessages} = include('enums');

module.exports = (err, req, res, next) => {
    if (err) {
        return res.status(403).send({
            message: err.errors ? errorMessages.AN_ERROR_OCCURRED : err.message,
            validations: err.errors,
            code: 403,
            success: false
        });
    }
    next();
};
