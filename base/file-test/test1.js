const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// // 读取文件内容
// fs.readFile(fileName, (err, data) => {
//   if (err) {
//     console.err(err)
//   }
//   // data 是二进制类型要转换为字符串
//   console.log(data.toString())
// })

// // 写入文件
// const content = '这是新加入的内容\n'
// const opt = {
//   flag: 'a' // 追加写入，覆盖用'w'
// }
// fs.writeFile(fileName, content, opt, err => {
//   if (err) {
//     console.log(err)
//   }
// })

// // 判断文件是否存在
// fs.exists(fileName, (exist) => {
//   console.log('exits', exist)
// })