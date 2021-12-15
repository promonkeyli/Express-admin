const express = require('express');
const router = express.Router();
const userValidator = require('../validator/user');

const UserController = require('../controller/UserController');

// 用户登陆
router.post('/user/login', UserController.Login);

// 用户注册
router.post('/user/register', UserController.Register);

// 获取当前用户
router.get('/user/:username', UserController.getCurrentUser);

module.exports = router;