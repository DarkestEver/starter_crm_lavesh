import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  socialMediaLinksFacebook: { type: String },
  socialMediaLinksTwitter: { type: String },
  socialMediaLinksInstagram: { type: String },
  socialMediaLinksLinkedin: { type: String },
  seo: { type: mongoose.Schema.Types.ObjectId , ref: 'Seo'},
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
