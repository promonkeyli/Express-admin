/**
 *token 校验中间件
 */
const { verify }  = require('../util/jwt');
const { jwtSecret } = require("../config/config");
const { User } = require("../model");

module.exports = async (req, res, next) => {
    // 1.从请求头获取 token 数据
    let  token  = req.headers['authorization'];
    token = token ? token.split('Bearer ')[1] : null;
    // 2.验证 token 是否有效
    // 3.无效 响应 401 状态码
    if (!token) return res.status(401).end();
    // 4.有效 把用户信息读取出来挂载到req请求对象上继续向后执行
    try {
        const decodeToken = await verify(token, jwtSecret);
        req.user = await User.findById(decodeToken.userId);
        next();
    }catch (e) {
        return res.status(401).end();
    }
}