// 1.引入mongoose 模块 -- 用于操作mongodb数据库
const mongoose = require('mongoose');
// 2.使用引入模块自带的方法 connect 连接数据库
const uri = 'mongodb://admin:123456@localhost/admin'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(uri, options,
    (error) => {
    if (error) {
        console.log("数据库连接失败")
    } else {
        console.log("数据库连接成功")
    }
})
module.exports = mongoose;