# Web-Server

基于 ES6 / Node.js 原生开发 Web server 博客，并使用 Express / Koa 等框架进行重构，使用 Nginx 做反向代理。

以后端为主（与前端进行联调），主要有登录、安全、日志等方面内容。

## Start

主要分为五个部分：

* base：
* blog-node：原生Node.js
* blog-express：
* blog-koa2

## Process Document

* [开发路由](https://gitee.com/istaotao/node-blog-express-koa2/blob/master/docs/router.md)
* [数据库 MySQL](https://gitee.com/istaotao/node-blog-express-koa2/blob/master/docs/mysql.md)
* [登录](https://gitee.com/istaotao/node-blog-express-koa2/blob/master/docs/signin.md)
* [nginx](https://gitee.com/istaotao/node-blog-express-koa2/blob/master/docs/nginx.md)
* [日志](https://gitee.com/istaotao/node-blog-express-koa2/blob/master/docs/log.md)
* [安全](https://gitee.com/istaotao/node-blog-express-koa2/blob/master/docs/safety.md)
* [Express](https://gitee.com/istaotao/node-blog-express-koa2/blob/master/docs/express.md)
* [Koa](https://gitee.com/istaotao/node-blog-express-koa2/blob/master/docs/koa.md)
* [中间件原理](https://gitee.com/istaotao/node-blog-express-koa2/blob/master/docs/middleware.md)

## Tool

* [Postman](https://www.getpostman.com/)是一款接口测试工具，使用方法[Postman 工具](https://www.jianshu.com/p/556a7700004d)
* [Mysql Workbench](https://dev.mysql.com/downloads/workbench/)是为 MySQL 设计的 ER/数据库建模工具
* [Nginx](http://nginx.org/) v-1.18.0，是一个高性能的 HTTP 和反向代理 web 服务器
* [Redis](https://redis.io/) 中文文档：[Redis](http://www.redis.cn/) 是一个开源（BSD 许可）的，内存中的数据结构存储系统，它可以用作数据库、缓存和消息中间件
