const {
  exec,
  escape
} = require('../db/mysql')
const {
  genPassword
} = require('../utils/cryp')

const login = (username, password) => {
  // 假数据
  // if (username === 'zhangsan' && password === 123456) {
  //   return true
  // }
  // return false

  username = escape(username)

  // 生成加密密码
  password = genPassword(password)
  password = escape(password)

  let sql = `select username, realname from users where username=${username} and password=${password}`
  // console.log('sql is:', sql)
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

module.exports = {
  login
}