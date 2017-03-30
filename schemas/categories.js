/**
 * Created by ht on 2017/3/27.
 */

var mongoose = require('mongoose');

/**
 * 用户的表结构
 * 定义分类表结构
 */
module.exports = new mongoose.Schema({
    // 分类
    name: String,
});
