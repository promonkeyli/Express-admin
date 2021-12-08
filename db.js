const fs = require("fs");
exports.getDb = () => {
    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err){
            // 文件读取失败则返回 500 状态
            return  res.status(500).json({error: err.message})
        }
        const val = JSON.parse(data);
        res.status(200).json(val.todos);

    });
}