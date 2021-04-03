const http = require('http')
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    // req 数据格式
    console.log('req content-type', req.headers['content-type']);
    // 接收数据
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      console.log(postData);
      res.end('hello world !')
    })
  }
})
server.listen(8000)
console.log('OK');