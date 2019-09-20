const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  image: { type: String },
  bannerimg: { type: String },
},
{
  timestamps: true
})

module.exports = mongoose.model('Banner', schema)