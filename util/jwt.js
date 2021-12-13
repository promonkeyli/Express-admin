/**
 *jsonwebtoken 前后端交互中用于验证用户信息-以便从服务器获取资源
*/
const jwt = require('jsonwebtoken');
const { promisify } = require('util') // 对于最后一个参数是回掉函数形式的方法转为promise 可以使用async await

exports.sign = promisify(jwt.sign);
exports.verify = promisify(jwt.verify);
/*
// 1.生成jwt.sign secretOrPrivateKey 使用uuid
jwt.sign({
    foo: '123'
}, secret, (err, token) => {
    if (err){
        console.log(err);
    }
    console.log(token);
});
// 2.验证jwt.verify
jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiIxMjMiLCJpYXQiOjE2MzkyODQzNzN9.u0Xrgd_sH2-At92Jx2iZY4DZf4GBGb-yp_GmbL0GOsk',
    secret, (err, ret) => {
    if (err){
        console.log(err);
    }
        console.log(ret);
    })*/
