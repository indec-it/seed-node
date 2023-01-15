const {UserController} = include('controllers');

module.exports = router => {
    router.post('/session', UserController.validateSession);
    return router;
};
