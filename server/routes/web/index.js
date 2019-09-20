module.exports = app => {
  const router = require('express').Router()

  const mongoose = require('mongoose')
  const Article = mongoose.model('Article')
  const Category = mongoose.model('Category')
  const Banner = mongoose.model('Banner')
  const About = mongoose.model('About')
  const Friend = mongoose.model('Friend')
  const User = mongoose.model('User')
  const Comment = mongoose.model('Comment')

  const limit = 10
  //获取轮播
  router.get('/banners/list', async (req, res) => {
    const imgList = await Banner.find().limit(6)
    res.send(imgList)
  })
  //获取文章列表
  router.get('/articles/list', async (req, res) => {
    const page = req.query.page || 0  
    const articles = await Article.find().populate('categories author').sort({'_id': -1}).limit(limit).skip(page * limit)
    res.send(articles)
  })
  //获取文章项目列表
  router.get('/articles/demos', async (req, res) => {
    const demolist = await Category.find({name: '项目'}).populate({
      path: 'articles',
      populate: { path: 'author categories'}
    })
    // console.log(JSON.stringify(demolist));
    
    res.send(JSON.stringify(demolist))
  })

  //获取文章详情
  router.get('/articleInfo/:id', async (req, res) => {
    const item = await Article.findById(req.params.id).populate('categories author')
    res.send(item)
  })
  //文章点击更新
  router.put('/articles/:id', async (req, res) => {
    const {clicks} = req.body    
    const item = await Article.findByIdAndUpdate(req.params.id,{$set: {clicks: clicks}})
    res.send(item)
  })

  //获取分类列表
  router.get('/categories/list', async (req, res) => {
    const model = await Category.find().sort({'_id': -1})
    res.send(model)
  })
  //获取分类详情
  router.get('/categories/:id', async (req, res) => {
    const articles = await Category.findById(req.params.id).populate({
      path: 'articles',
      populate: { path: 'author categories'}
    })
    res.send(JSON.stringify(articles))
  })

  //获取简历
  router.get('/abouts', async (req, res) => {
    const item = await About.find().limit(1)
    res.send(item)
  })

  //获取友链列表
  router.get('/friends/list', async (req, res) => {
    const friends = await Friend.find()
    res.send(friends)
  })

  //获取留言列表
  router.get('/comments/list', async (req, res) => {
    const comments = await Comment.find().populate('user').sort({'_id': -1})
    res.send(comments)
  })
  //添加留言
  router.post('/comments', async (req, res) => {
    const item = await Comment.create(req.body)
    res.send({
      error: 0
    })
  })
  //留言点赞
  router.put('/comments/:id', async (req, res) => {
    const item = await Comment.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      error: 0
    })
  })

  //用户文章
  router.get('/users/:id', async (req, res) => {   
    const myArticles = await User.findById(req.params.id).populate({
      path: 'articles',
      populate: { path: 'author categories'}
    })   
    res.send(JSON.stringify(myArticles))
  })
  //用户文章删除
  router.delete('/articles/:id', async (req, res) => {  
    const model = await Article.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  //用户留言
  router.get('/users/comments/:id', async (req, res) => {   
    const myComments = await User.findById(req.params.id).populate({
      path: 'comments',
      populate: { path: 'user'}
    })      
    res.send(JSON.stringify(myComments))
  })
  //用户留言删除
  router.delete('/comments/:id', async (req, res) => {  
    const model = await Comment.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  //用户留言修改
  router.put('/users/comment/:id', async (req, res) => {
    // console.log(req.params.id, req.body); 
    const {data} = req.body 
    const item = await Comment.findByIdAndUpdate(req.params.id, {$set:{body: data}})
    res.send({
      error: 0
    })
  })

  //更新头像
  router.put('/users/:id', async (req, res) => {
    // console.log(req.params.id, req.body);  
    const item = await User.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      error: 0
    })
  })
  //更新个人信息
  router.put('/users/item/:id', async (req, res) => {
    // console.log(req.params.id, req.body); 
    const {name, data} = req.body
    const user = {}
    user[name] = data    
    const item = await User.findByIdAndUpdate(req.params.id, {$set:user})
    res.send({
      error: 0
    })
  })
  //修改密码
  router.put('/users/pwd/:id', async (req, res) => {
    const {name, data, checkPass} = req.body
    
    const assert = require('http-assert')
    const model = await User.findById(req.params.id).select('+password')
    const isValid = require('bcrypt').compareSync(data, model.password)
    if(!isValid){
      assert(isValid, 422, '密码错误')
    }else{
      const user = {}
      user[name] = checkPass        
      const item = await User.findByIdAndUpdate(req.params.id, {$set:user})
      res.send({
        error: 0
      })
    }
  })

  

  //注册
  router.post('/register', async (req, res) => {
    const {username} = req.body
    const user = await User.findOne({username})
    if(user){
      res.send({
        error: 1
      })
    }else{
      const model = User.create(req.body)
      res.send({
        error: 0
      })
    }   
  })

   //登录获取
   router.get('/users/:id', async (req, res) => {
    // console.log(req.params.id, req.body);  
    const item = await User.findById(req.params.id)
    res.send(item)
  })


  app.use('/web/api', router)
}