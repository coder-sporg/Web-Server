const xss = require('xss')
const {
  exec
} = require('../db/mysql')

const getList = (author, keyword) => {
  // 先返回假数据
  // return [{
  //   id: 1,
  //   title: '标题A',
  //   content: '内容A',
  //   createTime: 1615705213909,
  //   author: 'zhangsan'
  // }, {
  //   id: 2,
  //   title: '标题B',
  //   content: '内容B',
  //   createTime: 1615705301802,
  //   author: 'lisi'
  // }]

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
  return exec(sql)
}

const getDetail = (id) => {
  // 假数据
  // return {
  //   id: 1,
  //   title: '标题A',
  //   content: '内容A',
  //   createTime: 1615705213909,
  //   author: 'zhangsan'
  // }

  let sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
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
  return exec(sql).then(insertData => {
    // console.log(insertData);
    return {
      id: insertData.insertId
    }
  })

  // return {
  //   id: 3 // 新建博客插入到数据表里的 id
  // }
}

const updateBlog = (id, blogData = {}) => {
  // blogData 是一个博客对象，包含title content 属性  id就是需要更新博客的id
  // console.log(id, postData);

  const title = xss(blogData.title)
  const content = xss(blogData.content)

  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`

  return exec(sql).then(updateData => {
    // console.log(updateData);
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })

  // return true
}

const delBlog = (id, author) => {
  // 删除博客的id

  sql = `delete from blogs where id=${id} and author='${author}'`
  return exec(sql).then(delData => {
    // console.log(delData);
    if (delData.affectedRows > 0) {
      return true
    }
    return false
  })

  // return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}