/**
 * Created by ht on 2017/3/27.
 */
var express = require('express');
var router = express.Router();
var User = require('../modules/User');  // 返回一个构造函数，通过这个对象下面的方法，操作数据库

// 统一返回格式
var responseData;

router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    };

    next();
});

/**
 * 用户注册
 *      注册逻辑：
 *          1、用户名不能为空
 *          2、密码不能为空
 *          3、两次输入密码必须一致
 *
 *          4、涉及到数据库操作（用户是否已经被注册了）；
 *
 */
router.post('/user/register', function (req, res, next) {
    // console.log(req.body);
    // res.send('registr ok');

    var username = req.body.username,
        password = req.body.password,
        repassword = req.body.repassword;

    // 用户名是否为空
    if (username == '') {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        // 把对象转成json格式，返回给前端
        res.json(responseData);
        return;
    }

    // 密码不能为空
    if (password == '') {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        // 把对象转成json格式，返回给前端
        res.json(responseData);
        return;
    }

    // 两次输入密码必须一致
    if (password != repassword) {
        responseData.code = 3;
        responseData.message = '密码必须一致';
        // 把对象转成json格式，返回给前端
        res.json(responseData);
        return;
    }

    // 用户名是否已经被注册
    User.findOne({
        username: username
    }).then(function (userInfo) { // userInfo为查询username之后的返回结果
        // console.log(userInfo);
        if (userInfo) {
            // 表示数据库中有该记录
            responseData.code = '4';
            responseData.message = '用户名已经被注册了';
            res.json(responseData);
            return;
        }
        // 用户名没有别注册，保存用户名到数据库中
        else {
            var user = new User({
                username: username,
                password: password
            });

            return user.save();
        }
    }).then(function (newUserInfo) {
        console.log(newUserInfo);
        responseData.message = '注册成功';
        res.json(responseData);
    });

});

/**
 * 用户登录
 *      登录逻辑：
 *          1、用户名密码不能为空
 *          2、数据库中查询用户名和密码是否正确
 */
router.post('/user/login', function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;

    if (username == '' || password == '') {
        responseData.code = 1;
        responseData.message = '用户名或密码不能为空';
        res.json(responseData);
        return;
    }

    User.findOne({
        username: username,
        password: password
    }).then(function (userInfo) {
        if (userInfo) {
            // 数据库中有用户名信息
            if (password == userInfo.password) {
                // 登录成功
                responseData.code = 5;
                responseData.message = '登录成功';
                res.json(responseData);
                return;
            }
        }
        else {
            responseData.code = 6;
            responseData.message = '登录失败';
            res.json(responseData);
            return;
        }
    })

});

module.exports = router;