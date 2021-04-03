const http = require('http')

// 组合中间件
function compose(middlewareList) {
  return function (ctx) {
    // 中间件调用
    function dispatch(i) {
      const fn = middlewareList[i]
      try {
        return Promise.resolve(
          fn(ctx, dispatch.bind(null, i + 1)) // promise
        )
      } catch (error) {
        return Promise.reject(error)
      }
    }
    return dispatch(0)
  }
}

class LikeKoa2 {
  constructor() {
    // 中间件存储的地方
    this.middlewareList = []
  }

  use(fn) {
    this.middlewareList.push(fn)
    return this
  }

  createContext(req, res) {
    const ctx = {
      req,
      res
    }
    ctx.query = req.query
    return ctx
  }

  handleRequest(ctx, fn) {
    return fn(ctx)
  }

  callback() {
    const fn = compose(this.middlewareList)

    return (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, fn)
    }
  }

  listen(...args) {
    const server = http.createServer(this.callback)
    server.listen(...args)
  }
}

module.exports = LikeKoa2