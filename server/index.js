const express = require('express')

const app = express()
//设置token秘钥
app.set('secret', '123456')
//引入允许跨域依赖
app.use(require('cors')())
//允许使用json格式
app.use(express.json())
//静态文件托管
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use('/', express.static(__dirname + '/public/wblog'))
app.use('/web', express.static(__dirname + '/public/mblog'))
app.use('/admin', express.static(__dirname + '/public/admin'))
app.use('/demo', express.static(__dirname + '/public/demo'))

//引用数据库模块接口
require('./plugins/db')(app)
//引用admin后台接口
require('./routes/admin')(app)
//PC端前台接口
require('./routes/blog')(app)
//移动端前台接口
require('./routes/web')(app)
//登录接口
require('./routes/login/admin')(app)
require('./routes/login/web')(app)
require('./routes/login/blog')(app)
// 图片上传接口
require('./routes/upload')(app)


app.listen(7000, () => {
  console.log('http://localhost:7000');
})

// app.listen(() => {
//   console.log('启动成功');
// })