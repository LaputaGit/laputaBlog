/**
 * Created by ht on 2017/3/27.
 */
var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Category = require('../models/Category');

// 对当前用户的身份做判断
router.use(function (req, res, next) {
    if (!req.userInfo.isAdmin) {
        res.send('对不起，只有管理员才可以进入后台管理！');
        return;
    };
    next();
});

/**
 * 首页
 */
router.get('/', function (req, res, next) {
    // res.send('管理员后台');
    res.render('admin/index', {
        userInfo: req.userInfo
    });
});

/**
 * 用户管理
 */
router.get('/user', function (req, res, next) {

    /**
     * 从数据库中读取所有用户的数据，并把数据分配给模板展示
     *
     * limit(number): 限制获取的数据的条数;
     *
     * skip(): 忽略数据的条数，配合limit()使用
     *
     * 每页显示2条
     * 1：1-2 skip: 0 -> (当前页-1) * limit
     * 2: 3-4 skip: 2
     */

    // console.log(req.query);

    var page = Number(req.query.page || 1),
        limit = 5,
        pages = 0;

    User.count().then(function (count) {
        // 计算总页数
        pages = Math.ceil(count / limit);
        // 取值不能超过page
        page = Math.min(page, pages);
        // 取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;

        User.find().limit(limit).skip(skip).then(function (users) {
        console.log(users);

        res.render('admin/user_index', {
            userInfo: req.userInfo,
            users: users,
            page: page,
            pages: pages,
            limit: 2,
            count: count
        });
        });
    });

});

/**
 * 分类首页
 */
router.get('/category', function (req, res, next) {
    var page = Number(req.query.page || 1),
        limit = 5,
        pages = 0;

    Category.count().then(function (count) {
        // 计算总页数
        pages = Math.ceil(count / limit);
        // 取值不能超过page
        page = Math.min(page, pages);
        // 取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;

        Category.find().limit(limit).skip(skip).then(function (categories) {
            console.log(categories);

            res.render('admin/category_index', {
                userInfo: req.userInfo,
                categories: categories,
                page: page,
                pages: pages,
                limit: 2,
                count: count
            });
        });
    });
});

/**
 * 分类的添加
 */
router.get('/category/add', function (req, res, next) {
   res.render('admin/category_add', {
       userInfo: req.userInfo
   })
});

/**
 * 分类的保存
 */
router.post('/category/add', function(req, res) {

    var name = req.body.name || '';

    if (name == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '名称不能为空'
        });
        return;
    }

    //数据库中是否已经存在同名分类名称
    Category.findOne({
        name: name
    }).then(function(rs) {
        if (rs) {
            //数据库中已经存在该分类了
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类已经存在了'
            })
            return Promise.reject();
        } else {
            //数据库中不存在该分类，可以保存
            return new Category({
                name: name
            }).save();
        }
    }).then(function(newCategory) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '分类保存成功',
            url: '/admin/category'
        });
    })

});

/**
 * 分类的修改
 */
router.get('/category/edit', function (req, res) {
    res.render('admin/category_edit', {});

    // 获取要修改的分类信息，并且用表单的形式展现出来
    var id = req.query.id || '';

    // 获取要修改的分类信息
    Category.findOne({
        id: id
    }).then(function (category) {
        if (!category) {

        }
    });
});



/**
 * 博客分类
 */
router.get('/blog', function (req, res, next) {
    res.render('admin/blog_index.html', {
        userInfo: req.userInfo
    });
});



module.exports = router;