const redis = require('redis')

// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err => {
  console.error(err)
})

// 测试
redisClient.set('myName', 'zhangsan', redis.print)
// 异步执行
redisClient.get('myName', (err, val) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('val', val)

  // 退出
  redisClient.quit()
})