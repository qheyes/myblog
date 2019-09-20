module.exports = app => {
  const jwt = require('jsonwebtoken')
  const User = require('../../../models/User')
  const assert = require('http-assert')
  //1.登录
  app.post('/blog/api/login',async (req, res) => {

    const {username, password} = req.body
    //根据用户名找用户,查询并显示密码
    const user = await User.findOne({username}).select('+password')
    assert(user, 422, '用户名不存在')

    //2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)

    assert(isValid, 422, '密码错误')

    //3.返回token
    //生成token
    const token = jwt.sign({id: user._id}, app.get('secret'))
    res.send({
      token,
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