# laputaBlog
基于node的播客项目

# 开发概览
### 1、项目创建、安装、初始化
### 2、模板引擎的配置和使用
### 3、静态文件托管
### 4、分模块开发与实现
### 5、数据库连接、表结构schema
### 6、用户注册前端页面逻辑
### 7、body-parser模块的使用和后端用户名注册的基本验证
### 8、基于数据库的验证和用户信息保存
### 9、用户登录
### 10、普通用户和管理员功能的实现
### 11、后台管理功能及界面的搭建
### 12、后台管理-注册用户数据展示
### 13、后台管理-注册用户数据分页原理和实现
### 14、后台管理-添加博客分类功能
### 15、后台管理-博客分类的修改和删除
### 16、前台分类导航展示与排序
### 17、后台管理-博客内容添加管理
### 18、后台管理-博客内容编辑与删除
### 19、后台管理-博客内容信息扩展
### 20、前台内容分页展示
### 21、前台内容分类展示
### 22、内容详情页展示和阅读数处理
### 23、内容评论实现
### 24、评论分页展示


# 1、基本准备知识
    1、搭建node环境，node的安装和执行
    2、node基础模块的使用
        2.1、Buffer: 二进制数据处理模块
        2.2、Events: 事件模块
        2.3、fs: 文件系统模块
        2.4、Net: 网络模块
        2.5、Http: http模块
        
# 2、项目功能需求分析
## 2.1 前台管理功能
    - 首页内容聚合
    - 列表页 - 分类列表
    - 内容页 - 有评论功能
    - 注册
    - 登录
    
## 2.2、后台
    - 分类管理
        - 分类列表
        - 添加分类
        - 修改分类
        - 删除分类
        - 查看分类下的所有文章
    - 内容管理
        - 内容列表
            - 所有内容
            - 按分类查看
        - 添加内容
        - 修改内容
        - 删除内容
        - 查看内容下的所有评论
    - 评论管理
        - 评论列表
            - 所有评论
            - 查看指定博文的评论
        - 删除评论

# 3、项目目录
    db  数据库存储目录
    models  数据库模型文件目录
    node_modules    node第三方模块目录
    public  公共文件目录（css, js, image...）
    routers 路由文件目录
    schemas 数据库结构文件(schema)目录
    views   数据视图文件目录
    app.js  应用入口文件
    package.json
    
# 4、技术框架介绍
    - nodejs
    - Express
    - mongodb
    - 第三方模块 & 中间件
        - bodyParser: 解析post请求数据
        - cookies: 读写cookie
        - swig：模板解析引擎
        - mongoose: 操作mongodb数据
        - markdown: markdown语法解析生成模块
        
# 5、应用创建
## 5.1、创建应用、监听端口
    var express = require('express');
    var app = express();
    app.listen(8081);
    
## 5.2 用户的访问
    - 用户通过URL访问web应用，如http://localhost:8081/
    - web后端根据用户访问的URL处理不同的业务逻辑
    
# 6、处理请求输出
    - 路由绑定：
        通过app.get()或app.post()方法可以把一个url路径和一个或者N个处理函数进行绑定
    - 内容输出：
        通过res.send(string)发送内容至客户端
        
# 7、使用模板
    - 模板的使用
        后端逻辑和页面表现分离 - 前后端分离
    - 模板配置
        var swig = require('swig'）;
        app.engine('html', swig.renderFile), 定义模板引擎，使用swig.renderFile解析后缀为html的文件
        
        html的文件
         app.set('views', './views'); 设置模板存放目录
         app.set('view engine', 'html'); 注册模板引擎
         
         swig.setDefaults({cache: false}); 见app.js
         
# 8、 静态资源文件处理
    在public目录下划分并存放好相关的静态资源文件
    app.use('/public', express.static(__dirname + '/public'));
    
# 9、分模块开发与实现
    1、根据功能进行模块划分
        前台模块
        后台模块
        API模块
        
        使用app.use()进行模块划分
            app.use('/admin', require('./router/admin'));
            app.use('/api', require('./router/api'));
            app.use('/', require('./router/main'));
            
    2、前台路由 + 模板
        - main模块
            /       首页
            /view   内容页
            
        - api模块
            /               首页
            /register       用户注册
            /login          用户登录
            /comment        评论获取
            /comment/post   评论提交
    
    3、后台路由 + 模板
        - /       首页
        
        - 用户管理
            /user       用户列表
            
        - 分支管理
            /category           分类列表
            /category/add       分类添加
            /category/edit      分类修改   
            /category/delete    分类删除
            
        - 文章内容管理
            /article            内容列表        
            /article/add        内容添加
            /article/edit       内容修改
            /article/delete     内容删除
            
        - 评论内容管理
            /comment            评论列表
            /comment/delete     评论删除
            
    4、 功能模块划分
        用户 - 登录 + 注册 + 管理员验证
        栏目 - 后台管理 + 前台展示 （增删盖茶）
        内容 - 同上
        评论 - 同上
        
    5、编码顺序
        通过schema定义涉及数据存储结构
        功能逻辑
        页面展示
        
    6、用户注册
    
# 10、数据库链接、表结构schema
    数据库的使用
        mongod --dbpath = 数据文件保存路径
        
    数据保存
        使用mongoose操作数据库
        
    创建model
        通过schema创建模型类
        mongoose.model('模型类名称'， Schema);
        
        
        
        
        
# 待研究： node中对于加密的处理
        
    
       