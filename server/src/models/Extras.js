import mongoose from "mongoose";

const blockGuideSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  delayAnimation: { type: String, required: true },
});

const newsletterSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    subHeading: { type: String, required: true },
    inputPlaceholder: { type: String, required: true },
    btnText: { type: String, required: true },
});

const BlockGuide = mongoose.model('BlockGuide', blockGuideSchema);
const Newsletter = mongoose.model('Newsletter', newsletterSchema);

export {
  BlockGuide,
  Newsletter,
};
