const Controller = require('egg').Controller

class UserController extends Controller {
    async register() {
        const { ctx } = this
        // 校验
        ctx.validate({
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
        })
        // 判断邮箱是否存在
        const userBody = ctx.request.body
        if (await this.service.user.findEmail(userBody.email)) {
            return ctx.throw(422, '邮箱已经存在')
        }
        const user = await this.service.user.registerUser(userBody)
        ctx.body = user
    }
}

module.exports = UserController