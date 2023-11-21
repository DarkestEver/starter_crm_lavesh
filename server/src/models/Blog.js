import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  __isNew__: { type: Boolean, required: true }
});

const blogSchema = new mongoose.Schema({
  img: { type: String, required: true },
  title: { type: String, required: true },
  param: { type: String, required: true },
  date: { type: String, required: true },
  delayAnimation: { type: String, required: true },
  details: { type: String, required: true },
  tag: [tagSchema],
  seo: { type: mongoose.Schema.Types.ObjectId , ref: 'Seo'},
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
