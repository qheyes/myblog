const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  phone: { type: String },
  username: { type: String },
  content: { type: String },
  password: { 
    type: String, 
    // 默认密码不显示查询
    select: false,
    set(val){
      // hashSync(加密的值, 加密指数10-12)
      return require('bcrypt').hashSync(val, 10)
    } 
  },
  isAdmin: { type: Boolean, default: false },
  headicon: { type: String, default: 'http://www.qianheye.cn/uploads/headicon/ae3f1850cf225cec336810fdc19ee3f7'}
},
{
  toJSON: { virtuals: true }
},
{
  timestamps: true
})

schema.virtual('articles', {
  ref: 'Article',
  localField: '_id',
  foreignField: 'author',
  justOne: false,
})

schema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
})

module.exports = mongoose.model('User', schema)