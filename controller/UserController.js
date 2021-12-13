const { User } = require('../model')
const jwt = require('../util/jwt');

// 用户登陆 controller
exports.Login = async (req, res, next) => {
    try {
        // 数据验证
        const { username, password } = req.body.user;
        console.log(username, password);
        // 1. 如果用户名不存在 返回404 并返回错误信息 -- 用户不存在
        // 2. 如果用户存在 取出密码做对比 一致的话 生成token 返回token，否则 返回400 密码错误
        res.status(200).end('login');
    }catch (e) {
        next(e)
    }
}

// 用户注册 controller
exports.Register = async (req, res, next) => {
    try {
        const user = new User(req.body.user); // 此处构造对象
        // todo 此处保存前必须进行数据库数据比对，不能存在相同的用户名
        if (user.username === 'admin'){
            res.status(200).json({
                error: {
                    message: '用户名已存在'
                }
            })
        }else {
            await user.save(); // 保存
            res.status(201).json({
                success: true
            });
        }

    }catch (e) {
        next(e)
    }
}

// 获取当前用户 controller
exports.getCurrentUser = async (req, res, next) => {
    try {
        // 处理请求
        // 响应状态
        res.end(`getCurrentUser/${req.params.uid}`);

    }catch (e) {
        next(e)
    }
}