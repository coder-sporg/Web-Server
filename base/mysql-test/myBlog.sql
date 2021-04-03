use myblog;

-- show tables;

-- 增加
-- insert into users (username,`password`,realname) values ('lisi','123','李四');

-- 查询
-- select * from users;
-- select id,username from users;

-- and/or
-- select * from users where username='zhangsan' and `password`='123';

-- 模糊查询
-- select * from users where username like '%zhang%';
-- 2列
-- select * from users where `password` like '%1%';

-- 排序	desc倒序
-- select * from users where `password` like '%1%' order by id desc;

-- 更新
-- update users set realname='李四2' where username='lisi';

-- SET SQL_SAFE_UPDATES = 0;

-- 删除
-- delete from users where username='lisi';


-- select * from users where state='1';

-- 软删除
-- update users set state='0' where username='lisi';

-- 恢复
-- update users set state='1' where username='lisi';

-- 查询 state!==0
-- select * from users where state <> '0';

-- insert into blogs (title,content,createtime,author) values ('标题A','内容A',1615795606409,'zhangsan');
-- insert into blogs (title,content,createtime,author) values ('标题B','内容B',1615795672683,'lisi');

-- 创建时间逆序排列
-- select * from blogs order by createtime desc;

-- 查询作者页
-- select * from blogs where author='lisi' order by createtime desc;

-- 关键字查询
-- select * from blogs where title like '%标题%' order by createtime desc;

select * from users;
select * from blogs;

-- 查询版本
select version();
-- 5以上版本 varchar(10) 表示10个字符(数字、英文、汉字)
