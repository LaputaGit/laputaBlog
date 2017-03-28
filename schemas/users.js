/**
 * Created by ht on 2017/3/27.
 * 定义数据结构
 */

var mongoose = require('mongoose');

/**
 * 用户的表结构
 * 一个schema代表数据库中的一个表结构
 * 需对外提供出去，后期的数据会根据这个表结构进行操作
 * 仅仅定义表结构还不够，实际操作的时候不是直接操作这个表结构，而是需要去定义一个模型类(model类)，即modules目录下
 * 在应用中是直接操作模型类（增删改查），模型类是基于这个结构进行处理的
 */
module.exports = new mongoose.Schema({
    // 用户名
    username: String,
    // 密码
    password: String
});
