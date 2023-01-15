const {UserService} = include('services');
const {errorMessages} = include('enums');

const logger = include('helpers/logger');

module.exports = async (req, res, next) => {
    const header = req.get('Authorization');
    if (!header) {
        return res.send(401).send({message: errorMessages.MUST_SEND_A_TOKEN, code: 401});
    }
    try {
        const token = header.replace('Bearer ', '');
        const {success, user} = await UserService.validateToken(token);
        if (!success || user.deleted) {
            return res.status(401).send({message: errorMessages.UNAUTHORIZED, code: 401});
        }
        req.user = user;
        logger.info(`${user._id} - ${user.surname} ${user.name}`);
        next();
    } catch (err) {
        res.status(401).send({message: err.message, code: 401});
    }
};
