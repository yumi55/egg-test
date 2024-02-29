const Controller = require('egg').Controller

class UserController extends Controller {
    async register() {
        const { ctx } = this
        ctx.validate({
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
        })
        ctx.body = 'register'
    }
}

module.exports = UserController