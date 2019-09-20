const mongoose = require('mongoose')

const schema = new mongoose.Schema({  
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
  body: { type: String },
  clicks: { type: Number, default: 0},
  
},{
  timestamps: true
})

module.exports = mongoose.model('Comment', schema)