const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {type: String, unique: true},
    description: {type: String},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    deleted: { type: Number, default: 0}
    },
    { timestamps: true }
);
  
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;