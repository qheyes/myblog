module.exports = app => {
  const router = require('express').Router()

  const mongoose = require('mongoose')

  const Banner = mongoose.model('Banner')
  const Comment = mongoose.model('Comment')
  const Article = mongoose.model('Article')
  const Category = mongoose.model('Category')
  const About = mongoose.model('About')
  const Friend = mongoose.model('Friend')
  const User = mongoose.model('User')

  const limit = 8

  //获取轮播
  router.get('/banners/list', async (req, res) => {
    const imgList = await Banner.find().limit(6)
    res.send(imgList)
  })

  //获取最新文章列表
  router.get('/articles/news', async (req, res) => {
    const page = req.query.page || 0  
    const count = await Article.find()
    const news = await Article.find().populate('categories author').sort({'_id': -1}).limit(limit).skip(page * limit)
    res.send({
      news,
      count: count.length
    })
  })
  //获取热门文章列表
  router.get('/articles/hots', async (req, res) => {
    const hots = await Article.find().populate('categories author').sort({'clicks': -1}).limit(limit)
    res.send(hots)
  })
  //获取分类列表
  router.get('/categories/list', async (req, res) => {
    const model = await Category.find().sort({'_id': -1})
    res.send(model)
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
  /* created获取完毕  */
  
  //获取文章详情
  router.get('/articles/:id', async (req, res) => {
    const item = await Article.findById(req.params.id).populate('categories author')
    res.send(item)
  })
  //文章点击更新
  router.put('/articles/:id', async (req, res) => {
    const {clicks} = req.body    
    const item = await Article.findByIdAndUpdate(req.params.id,{$set: {clicks: clicks}})
    res.send(item)
  })
  //获取分类文章
  router.get('/categories/:id', async (req, res) => {

    const articles = await Category.findById(req.params.id).populate({
      path: 'articles',
      populate: { path: 'author categories'}
    })
    res.send(JSON.stringify(articles))
  })

  /* article部分 */ 
  
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
  //用户留言删除
  router.delete('/comments/:id', async (req, res) => {  
    const model = await Comment.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  //获取用户留言
  router.get('/users/comments/:id', async (req, res) => {   
    const myComments = await User.findById(req.params.id).populate({
      path: 'comments',
      populate: { path: 'user'}
    })      
    res.send(JSON.stringify(myComments))
  })
  

  /* message留言部分 */ 

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
    const item = await User.findById(req.params.id)
    res.send(item)
  })

  //更新个人信息
  router.put('/users/item/:id', async (req, res) => {
    const item = await User.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      error: 0
    })
  })

  //上传文章
  router.post('/articles', async (req, res) => {  
    const model = await Article.create(req.body)
    res.send(model)
  })
  //修改详情
  router.put('/articles/edit/:id', async (req, res) => {  
    const model = await Article.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //用户文章
  router.get('/users/articles/:id', async (req, res) => {   
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

  app.use('/blog/api', router)
}