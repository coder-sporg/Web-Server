const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const {
  set,
  get
} = require('./src/db/redis')
const {
  access
} = require('./src/utils/log')

// 获取 cookie 的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  // console.log(d.toGMTString())
  return d.toGMTString()
}

// session 数据
// let SESSION_DATA = {}

// 用于处理 post data
const getPostData = req => {
  const p = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
  return p
}

const serverHandle = (req, res) => {
  // 记录日志
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')

  // 获取path
  req.path = req.url.split('?')[0]

  // 解析 query
  req.query = querystring.parse(req.url.split('?')[1])

  // 解析 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || '' // k1=v1;k2=v2
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()

    req.cookie[key] = val
  })

  // 解析 session(redis)
  let needSetCookie = false
  let userId = req.cookie.userid

  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    // 初始化 redis 中的 session 的值
    set(userId, {})
  }

  // 获取 session 的值
  req.sessionId = userId
  get(req.sessionId).then(sessionData => {
    if (sessionData == null) {
      // 初始化 redis 中的 session 值
      set(req.sessionId, {})
      // 初始化 session 值
      req.session = {}
    } else {
      // 设置session的值
      req.session = sessionData
    }

    // post data
    return getPostData(req)
  }).then(postData => {
    req.body = postData
    // console.log(postData);
    // })

    // if (userId) {
    //   if (!SESSION_DATA[userId]) {
    //     SESSION_DATA[userId] = {}
    //   }
    // } else {
    //   needSetCookie = true
    //   userId = `${Date.now()}_${Math.random()}`
    //   SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId]

    // 处理 post data
    // getPostData(req).then(postData => {
    //   req.body = postData

    // 处理blog路由

    // const blogData = handleBlogRouter(req, res)
    // if (blogData) {
    //   res.end(
    //     JSON.stringify(blogData)
    //   )
    //   return
    // }

    // blog 路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }

        res.end(JSON.stringify(blogData))
      })
      return
    }

    // 处理user路由
    // const userData = handleUserRouter(req, res)
    // if (userData) {
    //   res.end(
    //     JSON.stringify(userData)
    //   )
    //   return
    // }

    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        // 操作cookie
        if (needSetCookie) {
          res.setHeader('Set-cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }

        res.end(JSON.stringify(userData))
      })
      return
    }

    // 未命中路由，反回404
    res.writeHead(404, {
      'Content-type': 'text/plain'
    })
    res.write('404 Not Found\n')
    res.end()
  })

  // const resData = {
  //   name: '七月',
  //   site: 'imooc',
  //   env: process.env.NODE_ENV
  // }
  // res.end(
  //   JSON.stringify(resData)
  // )
}

module.exports = serverHandle