module.exports = app => {
  const jwt = require('jsonwebtoken')
  const User = require('../../../models/User')
  const assert = require('http-assert')
  //1.登录
  app.post('/admin/api/login',async (req, res) => {
    // const us = await User.create({
    //   username: 'qianheye1',
    //   password: '123456',
    //   isAdmin: true
    // })
    const {username, password} = req.body
    //根据用户名找用户,查询并显示密码
    const user = await User.findOne({username}).select('+password')
    assert(user, 422, '用户名不存在')
    // if(!user){
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }

    //2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)

    assert(isValid, 422, '密码错误')
    // if(!isValid){
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }
    const isAdmin = user.isAdmin;
    assert(isAdmin, 422, '你不是管理员！')

    //3.返回token
    //生成token
    const token = jwt.sign({id: user._id}, app.get('secret'))
    res.send({
      token,
      username: user.username,
      _id: user._id
    })
  })
  
  //错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}