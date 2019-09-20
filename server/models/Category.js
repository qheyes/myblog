const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}
}, {
  toJSON: { virtuals: true }
})

schema.virtual('articles', {
  ref: 'Article',
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
})

module.exports = mongoose.model('Category', schema)