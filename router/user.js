const express = require('express');
const router = express.Router();
const userValidator = require('../validator/user');

const UserController = require('../controller/UserController');

const auth = require('../middle-ware/auth');

// 用户登陆
router.post('/user/login', UserController.Login);

// 用户注册
router.post('/user/register', UserController.Register);

// 获取当前用户
router.get('/user', auth, UserController.getCurrentUser);

module.exports = router;