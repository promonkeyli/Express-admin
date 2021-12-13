const express = require('express');
const router = require("./router");
const app = new express();

const morgan = require('morgan');
const cors = require('cors')

const { PORT } = require('./config/config');

const err = require('./middle-ware/err');
require('./util/jwt');

// 1.打印日志中间件
app.use(morgan('dev'));
// 2.req 请求体解析配置
app.use(express.json());
// 3.设置允许跨域
app.use(cors());
// 4.路由注册
app.use('/api', router);
// 5.错误处理中间件
app.use(err());
// 端口监听
app.listen(PORT, () => {
    console.log(`listen ${ PORT } serve is running !`);
})