const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  content: { type: String },
  url: { type: String },
  friendicon: { type: String },
},
{
  timestamps: true
})

module.exports = mongoose.model('Friend', schema)