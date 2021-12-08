const express = require('express');
const fs = require('fs'); // node 文件系统
const app = new express();

/*app.get('/',(req, res) => {
    res.status(200).send('请求成功！');
    res.end('Hello World');
})
app.post('/123',(req, res) => {
    res.end('post');
})
app.put('/user',(req, res) => {
    res.send('access /user')
})
app.delete('/detail', (req , res) => {
    res.send('delete detail');
})*/

// request: 前端 => 后端 response：后端 => 前端

// 获取列表
app.get('/todos',(req, res) => {
//    一般接口请求后会判断 是否携带token 以及token是否过期 过期以及没有token 会返回403禁止访问
    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err){
            // 文件读取失败则返回 500 状态
            return  res.status(500).json({error: err.message})
        }
        const val = JSON.parse(data);
        res.status(200).json(val.todos);

    }); // 读取文件为异步操作
    // res.status(200).send(todos);
})
// 获取列表中的某一条数据
app.get('/todos/:id', (req, res) => {
    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err){
            // 文件读取失败则返回 500 状态
            return  res.status(500).json({error: err.message})
        }
        // 此处遍历数组查找具体元素
        const id = Number(req.params.id)
        const todoItem = JSON.parse(data).todos.find(item => item.id === id);
        if (todoItem){
            res.status(200).json(todoItem); // 找到就返回200状态码，并返回查找项
        }else {
            res.status(404).end('未找到数据'); // 找不到id 则返回404 并结束响应
        }
    }); // 读取文件为异步操作
})


app.listen(3000, () => {
    console.log('server running localhost 3000');
})

// req