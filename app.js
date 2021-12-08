const mongoose = require("./config/mongoose");
const express = require('express');
const app = express();

// 创建集合规则
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});

// 使用规则创建集合
// 1.集合名称
// 2.集合规则
const Course = mongoose.model('Course', courseSchema) // courses

// 向集合中插入文档
Course.create({name: 'Javascript', author: 'wuyuxin', isPublished: false}, (err, result) => {
	console.log(err)
	console.log(result)
})