const { User } = require('../model')
const jwt = require('../util/jwt');
const { jwtSecret } = require("../config/config");

// 用户登陆 controller
exports.Login = async (req, res, next) => {
    try {
        // 数据验证
        const { username, password } = req.body.user;
        User.findOne({username, password},
             (err, result) => {
            if (result === null){
                // 1. 如果用户名不存在 返回400 并返回错误信息 -- 用户不存在
                res.status(200).json({error:  true , message: "用户名或者密码有误！"})
            } else {
               // 2. 用户存在-根据user-id 签发 token 连同 username 一起返回到前端
                const { _id,  username } = result;
                jwt.sign({ userId: _id }, jwtSecret, async (err, value) => {
                    if (err !== null){ return res.status(500).end('token生成错误') }
                    else {
                        const token = `Bearer ${value}`;
                        res.status(200).json(
                            {
                                username,
                                token,
                                error: false,
                                message: '登陆成功'
                            }
                        );
                    }
                });
            }
        })
    }catch (e) {
        next(e)
    }
}

// 用户注册 controller
exports.Register = async (req, res, next) => {
    try {
        const user = new User(req.body.user); // 此处构造对象
        User.find({username: user.username}, async (err, result) => {
            if (result.length !== 0){
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
        })
    }catch (e) {
        next(e)
    }
}

// 获取当前用户 controller
exports.getCurrentUser = async (req, res, next) => {
    try {
        // 1.获取用户名参数
        console.log(req.headers);
        const { username } = req.params;
        // 2.数据库users集合查询当前用户
        User.findOne({ username }, async (error, result) => {
            if (Object.keys(result).length !== 0){
                // 2.1处理数据，用户的密码不用返回
                const { _id , username } = result;
                const userInfo = {userId: _id, username};
                res.status(200).json({ userInfo });
            }
        })
    }catch (e) {
        next(e)
    }
}