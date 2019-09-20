//接口模块查询中间件
module.exports = options => {
  return async (req, res, next) => {
    //将复数接口名转成单数模型名   
    const modelName = require('inflection').classify(req.params.resource)
    //将模型挂载到 req上   
    req.Model = require(`../models/${modelName}`) 
    next()
  }
}