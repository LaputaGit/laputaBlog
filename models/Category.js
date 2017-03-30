/**
 * Created by ht on 2017/3/29.
 */

var mongoose = require('mongoose');
// 加载定义好的表结构文件
var categoriesSchema = require('../schemas/categories');

// 通过mongoose.model()方法创建一个模型类，并暴露出去
module.exports = mongoose.model('Category', categoriesSchema);
