/**
 *token 校验中间件
 */
const jwt  = require('../util/jwt');
const { jwtSecret } = require("../config/config");

module.exports = verify = (token) => {
    return new Promise(async (resolve, reject) => {
        resolve (jwt.verify(token, jwtSecret));
    })
}