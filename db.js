const fs = require("fs");
const path = require('path');

const { promisify } = require('util'); // 引入node 工具库
const readFile = promisify(fs.readFile); // 读取文件方法转 promise
const writeFile = promisify(fs.writeFile); // 写入文件方法转 promise

const dbPath = path.join(__dirname, './db.json'); // 路径拼接
const code = 'utf8';
exports.getDb = async () => {
    const data = await readFile(dbPath, code);
    return JSON.parse(data);
}
exports.saveDb = async db => {
    // 1.首先将db数据转json格式
    const data = JSON.stringify(db, null, '  ');
    // 2.然后将数据重新写入db.json文件中
    await writeFile(dbPath, data);
}