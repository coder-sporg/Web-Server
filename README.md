# Web-Server

基于 ES6 / Node.js 原生开发 Web server 博客，并使用 Express / Koa 等框架进行重构，使用 Nginx 做反向代理。

以后端为主（与前端进行联调），主要有登录、安全、日志等方面内容。

## Start

主要分为五个部分：

* [base](https://github.com/coder-sporg/Web-Server/tree/main/base)：学习各个部分的test
* [blog-node](https://github.com/coder-sporg/Web-Server/tree/main/blog-node)：原生 Node.js 开发 Blog
* [blog-express](https://github.com/coder-sporg/Web-Server/tree/main/blog-express)：使用 Express 重构 Blog
* [blog-koa2](https://github.com/coder-sporg/Web-Server/tree/main/blog-koa2)：使用 Koa2 重构 Blog
* [html](https://github.com/coder-sporg/Web-Server/tree/main/html)：简单实现功能的前端页面

## Process Document

* [开发路由](https://github.com/coder-sporg/Web-Server/blob/main/base/docs/router.md)
* [数据库 MySQL](https://github.com/coder-sporg/Web-Server/blob/main/base/docs/mysql.md)
* [登录](https://github.com/coder-sporg/Web-Server/blob/main/base/docs/signin.md)
* [nginx](https://github.com/coder-sporg/Web-Server/blob/main/base/docs/nginx.md)
* [日志](https://github.com/coder-sporg/Web-Server/blob/main/base/docs/log.md)
* [安全](https://github.com/coder-sporg/Web-Server/blob/main/base/docs/safety.md)
* [Express](https://github.com/coder-sporg/Web-Server/blob/main/base/docs/express.md)
* [Koa](https://github.com/coder-sporg/Web-Server/blob/main/base/docs/koa.md)
* [中间件原理](https://github.com/coder-sporg/Web-Server/blob/main/base/docs/middleware.md)

## Tool

* [Postman](https://www.getpostman.com/)是一款接口测试工具，使用方法[Postman 工具](https://www.jianshu.com/p/556a7700004d)
* [Mysql Workbench](https://dev.mysql.com/downloads/workbench/)是为 MySQL 设计的 ER/数据库建模工具
* [Nginx](http://nginx.org/) v-1.18.0，是一个高性能的 HTTP 和反向代理 web 服务器
* [Redis](https://redis.io/) 中文文档：[Redis](http://www.redis.cn/) 是一个开源（BSD 许可）的，内存中的数据结构存储系统，它可以用作数据库、缓存和消息中间件
