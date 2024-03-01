module.exports = (options = { requried: true }) => {
    return async (ctx, next) => {
        let token = ctx.headers.authorization
        token = token ? token.split('Bearer ')[1] : null
        if (token) {
            try {
                const data = ctx.service.user.verifyToken(token)
                ctx.user = data.user
            } catch (error) {
                console.log(error, 'err')
                ctx.throw(401, 'token验证失败')
            }
        } else if (options.requried) {
            ctx.throw(401, 'token未传入')
        }
        await next()
    }
}