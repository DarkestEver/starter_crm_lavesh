import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  designation: { type: String, required: true },
  text: { type: String, required: true },
  delayAnimation: { type: String, required: true },
  published: { type: Boolean, required: true },
  seo: { type: mongoose.Schema.Types.ObjectId , ref: 'Seo'},
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
