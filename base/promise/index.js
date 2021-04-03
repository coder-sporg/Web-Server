const fs = require('fs')
const path = require('path')

// const fullFileName = path.resolve(__dirname, 'files', 'a.json')
// fs.readFile(fullFileName, (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(data.toString())
// })

// callback 方式获取一个文件的内容
// function getFileConent(fileName, callback) {
//   const fullFileName = path.resolve(__dirname, 'files', fileName)
//   fs.readFile(fullFileName, (err, data) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     callback(
//       JSON.parse(data.toString())
//     )
//   })
// }

// // 测试   回调地狱
// getFileConent('a.json', aData => {
//   console.log('a data', aData)
//   getFileConent(aData.next, bData => {
//     console.log('b data', bData);
//     getFileConent(bData.next, cData => {
//       console.log('c data', cData);
//     })
//   })
// })

// 用Promise
function getFileConent(fileName) {
  const promise = new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'files', fileName)
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err)
        // return
      }
      resolve(
        JSON.parse(data.toString())
      )
    })
  })
  return promise
}

// getFileConent('a.json').then(aData => {
//   console.log(aData);
//   return getFileConent(aData.next)
// }).then(bData => {
//   console.log(bData);
//   return getFileConent(bData.next)
// }).then(cData => {
//   console.log(cData);
// })

async function readFileData() {
  // 同步写法
  try {
    const aData = await getFileConent('a.json')
    console.log(aData);
    const bData = await getFileConent(aData.next)
    console.log(bData);
    const cData = await getFileConent(bData.next)
    console.log(cData);
  } catch (error) {
    console.error(error);
  }
}

readFileData()

// async function readAData() {
//   const aData = await getFileConent('a.json')
//   return aData
// }

// async function test() {
//   const aData = await readAData()
//   console.log(aData);
// }

// test()

// async await 要点
// 1. await 后面可以追加 promise 对象， 获取 resolve 的值
// 2. await 必须包裹在 async 函数里面
// 3. async 函数执行返回的也是一个 promise 对象
// 4. try-catch 截获 promise 中 reject 的值