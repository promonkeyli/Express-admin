/**
 * 数据库连接文件
 */
const mongoose = require('mongoose');
const { dbUri } = require('../config/config');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUri);
}

// 组织导出模型类
module.exports = {
    User: mongoose.model('user', require('./user'))
}