/**
 * Created by ht on 2017/3/27.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    // res.send('main');
    res.render('main/index');
});

module.exports = router;
