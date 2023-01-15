const {ArqService} = include('services');

class UserController {
    static async validateSession(req, res, next) {
        try {
            const {user, success} = await ArqService.validateToken(req.body.token);
            res.send({success, user});
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;
