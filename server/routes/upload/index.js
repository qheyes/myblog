module.exports = app => {
  //上传文件数据处理模块
  const multer = require('multer')
  // const baseURL = 'http://localhost:7000'
  const baseURL = 'http://www.qianheye.cn'
  //用户头像上传
  const headicon = multer({dest: __dirname + '/../../uploads/headicon'})
  app.post('/admin/api/upload/headicon', headicon.single('file'),async (req, res) => {
    const file = req.file
    file.url = `${baseURL}/uploads/headicon/${file.filename}`
    res.send(file)
  })
   //文章封面上传
   const articleicon = multer({dest: __dirname + '/../../uploads/articleicon'})
   app.post('/admin/api/upload/articleicon', articleicon.single('file'),async (req, res) => {
     const file = req.file
     file.url = `${baseURL}/uploads/articleicon/${file.filename}`
     res.send(file)
   })
   //文章内图片上传
   const articleimg = multer({dest: __dirname + '/../../uploads/articleimg'})
   app.post('/admin/api/upload/articleimg', articleimg.single('file'),async (req, res) => {
     const file = req.file
     file.url = `${baseURL}/uploads/articleimg/${file.filename}`
     res.send(file)
   })

   //轮播图上传
   const bannerimg = multer({dest: __dirname + '/../../uploads/bannerimg'})
   app.post('/admin/api/upload/bannerimg', bannerimg.single('file'),async (req, res) => {
     const file = req.file
     file.url = `${baseURL}/uploads/bannerimg/${file.filename}`
     res.send(file)
   })

    //友链图片上传
    const friendicon = multer({dest: __dirname + '/../../uploads/friendicon'})
    app.post('/admin/api/upload/friendicon', friendicon.single('file'),async (req, res) => {
      const file = req.file
      file.url = `${baseURL}/uploads/friendicon/${file.filename}`
      res.send(file)
    })


  //前端用户头像上传
  const usericon = multer({dest: __dirname + '/../../uploads/headicon'})
  app.post('/web/api/upload/headicon', usericon.single('file'),async (req, res) => {
    const file = req.file
    file.url = `${baseURL}/uploads/headicon/${file.filename}`
    res.send(file)
  })

  //PC用户头像上传
  const PCusericon = multer({dest: __dirname + '/../../uploads/headicon'})
  app.post('/blog/api/upload/headicon', PCusericon.single('file'),async (req, res) => {
    const file = req.file
    file.url = `${baseURL}/uploads/headicon/${file.filename}`
    res.send(file)
  })
  //文章封面上传
  const PCarticleicon = multer({dest: __dirname + '/../../uploads/articleicon'})
  app.post('/blog/api/upload/articleicon', PCarticleicon.single('file'),async (req, res) => {
    const file = req.file
    file.url = `${baseURL}/uploads/articleicon/${file.filename}`
    res.send(file)
  })
  //文章内图片上传
  const PCarticleimg = multer({dest: __dirname + '/../../uploads/articleimg'})
  app.post('/blog/api/upload/articleimg', PCarticleimg.single('file'),async (req, res) => {
    const file = req.file
    file.url = `${baseURL}/uploads/articleimg/${file.filename}`
    res.send(file)
  })

}