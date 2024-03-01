const Service = require('egg').Service
const jwt = require('jsonwebtoken')

class UserService extends Service {
    get User() {
        return this.app.model.User
    }
    userList() {
        return this.User.find()
    }

    findEmail(email) {
        return this.User.findOne({
            email
        }).select('+password')
    }

    async registerUser(data) {
        data.password = this.ctx.helper.md5(data.password)
        const user = new this.User(data)
        await user.save()
        return user
    }

    createToken(data) {
        return jwt.sign(data, this.app.config.jwt.secret, {
            expiresIn: this.app.config.jwt.expiresIn
        })
    }

    verifyToken(token) {
        return jwt.verify(token, this.app.config.jwt.secret)
    }


}
module.exports = UserService