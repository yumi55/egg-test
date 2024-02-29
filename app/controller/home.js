const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    // ctx.body = 'hi, egg';
    const userInfo = await app.model.User.find()
    ctx.body = userInfo
  }
}

module.exports = HomeController;
