/**
 * Created by ht on 2017/3/27.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    // res.send('main');
    // res.render('main/index');

    console.log(req.userInfo);
    res.render('main/index', { // 把cookies数据分配给模板
        userInfo: req.userInfo
    })
});

module.exports = router;
