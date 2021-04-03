const redis = require('redis')
const {
  REDIS_CONF
} = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
  console.error(err)
})

// set
function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}

// get
function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      // 获取不到值
      if (val == null) {
        resolve(null)
        return
      }

      // 兼容 json 转换的格式
      try {
        // 对应 if(typeof value === 'object') {...}
        resolve(JSON.parse(val))
      } catch (error) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  set,
  get
}