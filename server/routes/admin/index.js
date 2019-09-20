module.exports = app => {
  const express = require('express')
  // const jwt = require('jsonwebtoken')
  // const User = require('../../models/User')
  // const assert = require('http-assert')

  //开启子路由 (合并路径参数到router)
  const router = express.Router({
    mergeParams: true
  })

  //创建
  router.post('/', async (req, res) => {  
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  //获取列表
  router.get('/', async (req, res) => {  
    //条件查询
    const queryOptions = {}  
    switch (req.Model.modelName) {
      case 'Category':
        queryOptions.populate = 'parent'
        break;
      case 'Article':
        queryOptions.populate = 'categories author'
        break;
      case 'Comment':
        queryOptions.populate = 'user'
        break;  
    }
    const items = await req.Model.find().setOptions(queryOptions)
    res.send(items)
  })
  //获取详情
  router.get('/:id', async (req, res) => { 
    const queryOptions = {}   
    switch (req.Model.modelName) {
      case 'Comment':
        queryOptions.populate = 'user'
        break;  
    }
    const model = await req.Model.findById(req.params.id).setOptions(queryOptions)
    res.send(model)
  })
  //修改详情
  router.put('/:id', async (req, res) => {  
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //删除详情
  router.delete('/:id', async (req, res) => {  
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  //登录授权中间件
  const authMiddleware = require('../../middleware/auth')
  //接口模块查询中间件
  const resourceMiddleware = require('../../middleware/resource')

  //通用接口配置
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(),router)


  //错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}