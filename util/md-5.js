/**
 * node 内置md5模块 用于数据加密
 */
const  crypto = require('crypto'); // node 内置模块

// 获取 crypto 支持的散列算法
module.exports = value  => {
   return  crypto.createHash('md5')
        .update(`young${ value }`)
        .digest('hex')
}
