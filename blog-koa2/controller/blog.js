const xss = require('xss')
const {
  exec
} = require('../db/mysql')

const getList = async (author, keyword) => {

  // 因为author，keyword不确定where后面加1=1条件
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  // 返回 promise
  return await exec(sql)
}

const getDetail = async (id) => {

  let sql = `select * from blogs where id='${id}'`
  const rows = await exec(sql)
  return rows[0]
}

const newBlog = async (blogData = {}) => {
  // blogData 是一个博客对象，包含title content 属性
  // console.log('newBlog blogData...', blogData);

  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const author = blogData.author
  const createTime = Date.now()

  const sql = `
    insert into blogs(title, content, createTime, author)
    values('${title}', '${content}', ${createTime}, '${author}');
  `

  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

const updateBlog = async (id, blogData = {}) => {
  // blogData 是一个博客对象，包含title content 属性  id就是需要更新博客的id
  // console.log(id, postData);

  const title = xss(blogData.title)
  const content = xss(blogData.content)

  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`

  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}

const delBlog = async (id, author) => {
  // 删除博客的id

  sql = `delete from blogs where id=${id} and author='${author}'`

  const delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}