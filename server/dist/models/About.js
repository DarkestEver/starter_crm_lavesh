import mongoose from "mongoose";
const aboutSchema = new mongoose.Schema({
    TopHeader: {
        heading: { type: String, required: true },
        subHeading: { type: String, required: true },
    },
    BlockGuide: {
        heading: { type: String, required: true },
        subHeading: { type: String, required: true },
    },
    MainHeader: {
        heading: { type: String, required: true },
        subHeading: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        counter: { type: Boolean, required: true },
    },
    Testimonial: {
        heading: { type: String, required: true },
        subHeading: { type: String, required: true },
    },
});
const About = mongoose.model('About', aboutSchema);
export default About;
