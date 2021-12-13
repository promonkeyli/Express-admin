const mongoose = require('mongoose');
const md5 = require('../util/md-5');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set: value => md5(value) // 密码md5加密处理
    }
})

module.exports = userSchema;