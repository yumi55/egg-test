
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth

  router.prefix('/api/v1')
  router.post('/user/register', controller.user.register)
  router.post('/user/login', controller.user.login)
  router.get('/user/list', auth(), controller.user.list)
};
