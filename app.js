const express = require('express');
const router = require("./router/router");
const app = new express();

// 设置 request body 解析配置
app.use(express.json()); // 配置解析json body 用于post
app.use(express.urlencoded()); // 配置解析x-www-form-urlencoded body 用于post

// 挂载路由
// app.use(router);

// 挂载路由实例 并限制路由访问前缀
app.use('/todos', router);

// 端口监听
app.listen(3000, () => {
    console.log('listen 3000 serve is running !');
})