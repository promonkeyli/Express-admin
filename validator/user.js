const validator = require('../middle-ware/validator');
const { body } = require("express-validator");

exports.register = validator([
    body('user.username')
        .notEmpty()
        .withMessage("用户名不能为空"),
    body('user.password')
        .notEmpty()
        .withMessage("用户名密码不能为空")
])

