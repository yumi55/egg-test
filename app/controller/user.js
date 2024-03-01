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

    async login() {
        const { ctx } = this
        // 校验
        ctx.validate({
            email: { type: 'string' },
            password: { type: 'string' },
        })
        // 判断邮箱是否存在
        const userBody = ctx.request.body
        let user = await this.service.user.findEmail(userBody.email)
        if (!user) {
            return ctx.throw(422, '用户未注册')
        }
        // 判断密码
        if (this.ctx.helper.md5(userBody.password) !== user.password) {
            this.ctx.throw(422, '密码不正确')
        }

        const token = await this.service.user.createToken({ user })
        const doc = user._doc
        delete doc.password
        this.ctx.body = {
            ...doc,
            token
        }
    }
}

module.exports = UserController