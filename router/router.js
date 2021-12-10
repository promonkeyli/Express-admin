const express = require('express');
const {getDb, saveDb} = require("../db"); // 引入express
const router = express.Router(); // 引入路由器中间件 -- 对 get post 等请求方法进行挂载

// request: 前端 => 后端 response：后端 => 前端

// 获取列表
router.get('/', async (req, res) => {
//    一般接口请求后会判断 是否携带token 以及token是否过期 过期以及没有token 会返回403禁止访问
    try {
        const data = await getDb();
        console.log(data);
        res.status(200).json(data);
    } catch (err){
        res.status(500).json({error: err.message})
    }
})
// 获取列表中的某一条数据
router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        const data = await getDb();
        const todoItem = data.find(item => item.id === id);
        if (todoItem){
            res.status(200).json(todoItem); // 找到就返回200状态码，并返回查找项
        }else {
            res.status(404).end('未找到数据'); // 找不到id 则返回404 并结束响应
        }
    } catch (err){
        res.status(500).json({error: err.message})
    }
})
// 列表新增
router.post('/add',  async (req, res) => {
    try {
        const { name } = req.body; // 从请求体里结构name
        // 此处name有值才赋值，没有直接返回422
        if (!name){
            return res.status(422).json({error: "field must fill in"})
        } else {
            const data = await getDb();
            const lastId = data.length + 1;
            res.end();
            data.push({
                id: lastId,
                name: name
            })
            await saveDb(data);
        }
    }catch (err){
        res.status(500).json({error: err.message})
    }
})
// 列表修改
router.patch('/edit/:id', async (req, res) => {
    // 1.获取请求路径后的id
    // 2.获取数据
    // 2.1 数据校验 有该id则修改 没有则返回422 请求参数有误
    // 3.修改数据
    try {
        const id = Number(req.params.id);
        const name = req.body.name;
        if(!name) return res.status(422).json({error: "must return name"});
        const todos  = await getDb();
        const idIndex = todos.findIndex(item => item.id === id);
        if (idIndex !== -1){
            todos[idIndex].name = req.body.name;
            await saveDb(todos);
            res.status(200).end('修改成功');
        }else {
            res.status(404).json({error: `没有找到id为${id}的数据`})
        }
    }catch (err) {
        res.status(500).json({error: err.message})
    }
})
// 列表删除
router.delete('/delete/:id', async (req, res) => {
    try {
        const  id  = Number(req.params.id);
        if (id){
            const todos = await getDb();
            const delIndex = todos.findIndex(item => item.id === id);
            if (delIndex !== -1){
                todos.splice(delIndex, 1);
                await saveDb(todos);
            }else {
                res.status(422).json({error: `没有id为${id}的数据可删除`})
            }
            res.status(200).json(todos);
        }else {
            res.status(422).json({error: `id must return `})
        }
    }catch (e) {
        res.status(500).json({error: e.message});
    }
})

// 导出router实例  类似es6中的 export default
module.exports =  router;