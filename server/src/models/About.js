import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  topHeader: {
    heading: { type: String, required: true },
    subHeading: { type: String, required: true },
  },
  blockGuide: {
    heading: { type: String, required: true },
    subHeading: { type: String, required: true },
  },
  mainHeader: {
    heading: { type: String, required: true },
    subHeading: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    counter: { type: Boolean, required: true },
  },
  testimonial: {
    heading: { type: String, required: true },
    subHeading: { type: String, required: true },
  },
  seo: { type: mongoose.Schema.Types.ObjectId , ref: 'Seo'},
});

const About = mongoose.model('About', aboutSchema);
export default About;

