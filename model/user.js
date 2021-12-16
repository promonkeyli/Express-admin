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
        set: value => md5(value), // 密码md5加密处理
        select: false, // 默认不对密码进行查询
    }
})

module.exports = userSchema;