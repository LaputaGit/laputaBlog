// 加载express模块
var express = require('express');

// 加载模板处理模块
var swig = require('swig');

// 加载数据库模块
var mongoose = require('mongoose');

// 加载body-parser,用来处理前端提交过来的数据
var bodyParser = require('body-parser');

// 创建app应用 => nodejs http.createserver();即是服务端对象
var app = express();

// 配置模板 - express配置
// 第一个参数，模板引擎的名称，同时也是模板文件的后缀，第二个参数，表示处理模板内容的方法
app.engine('html', swig.renderFile);

/**
 * 为了考虑性能，模板解析之后，保存到内存当中，以后默认从内存中读取数据，不会重新读取解析
 * 线上的话，有缓存可以解决很多性能问题
 * 在开发过程中，需要取消模板缓存:
 */
swig.setDefaults({cache: false});

// bodyParser配置
app.use(bodyParser.urlencoded({extended: true}));


app.set('views', './views'); // 存放模板文件的目录
app.set('view engine', 'html'); // 注册所使用的模板引擎， 第二个参数和上述方法中定义的模板引擎的名称是一致的

// 路由处理 - 路由绑定
// app.get('/', function (req, res) {
//     // res.send('Hello Laputa');
//
//     /**
//      * 读取views目录下的指定文件，解析并返回给客户端
//      * 第一个参数，表示模板的文件，相对于views的目录 默认读取views/view.html, 并解析
//      * 第二个参数，传递给模板使用的数据
//      */
//     res.render('index')
// });

// 静态文件的处理，如下是基础的写法，效率低的可怕
// app.get('/main.css', function (req, res) {
//     res.setHeader('content-type', 'text/css');
//     res.send('body {background-color: red}');
// });

/**
 * 根据不同的功能划分模块：（其实也相当于子路由）
 *      前台模块:   app.use('/admin', require('./routers/admin));
 *      后台管理模块: app.use('/', require(./routers/main));
 *      API接口模块: app.use('/api', require('./routers/api'));
 */
// app.use('/admin', require('./routers/admin'));
// app.use('/', require('./routers/main'));
// app.use('/api', require('./routers/api'));

app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

/**
 * 静态文件托管
 * 当用户访问的url以/public开头，那么直接返回对应的__dirname + 'public'下的文件
 */
app.use('/public', express.static(__dirname + '/public'));

// 连接数据库
mongoose.connect('mongodb://localhost: 27018/blog', function (err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        // 监听http请求(只有在数据库连接成功之后，才去启动应用)
        app.listen(8081);
    }
});

// 监听http请求
// app.listen(8081);

// 总结：
// 用户发送http请求 -> url -> 解析路由 -> 找到匹配规则 -> 执行指定的绑定函数，返回对应内容至客户端{
//  1、静态文件的处理：如果访问的文件以/public文件开头 -> 直接读取指定目录下的文件，返回给用户
//  2、动态文件的处理：处理业务逻辑，加载模板，解析模板 -> 返回数据给用户
// }