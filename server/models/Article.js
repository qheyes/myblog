const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
  icon: { type: String, default: "http://www.qianheye.cn/uploads/articleicon/21d427f37d7e45304aaac6027aceaa3d"},
  author: { type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
  body: { type: String },
  clicks: { type: Number, default: 0},
  
},{
  timestamps: true
})

module.exports = mongoose.model('Article', schema)