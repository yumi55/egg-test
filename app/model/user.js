module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const userSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        phone: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: null,
        },
        createdAt: {
            // 创建时间
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            // 更新时间
            type: Date,
            default: Date.now,
        },
    });
    return mongoose.model('User', userSchema)
}
