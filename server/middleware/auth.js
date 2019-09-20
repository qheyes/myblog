//登录授权设置
module.exports = options => {

  const jwt = require('jsonwebtoken')
  const User = require('../models/User')
  const assert = require('http-assert')

  return async (req, res, next) => {    
    //解析token
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请提供token')
    //查询用户真实性
    const {id} = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, 'token无效')
    //挂载用户信息
    req.user = await User.findById(id)  
    assert(req.user, 401, '该用户不存在')   
    await next()
  }
}