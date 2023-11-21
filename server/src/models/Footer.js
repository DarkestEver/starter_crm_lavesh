import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  routerPath: { type: String, required: true },
});

const footerSchema = new mongoose.Schema({
  footerColumn: { type: Number, required: true },
  title: { type: String, required: true },
  published: { type: Boolean, required: true },
  menuList: [menuItemSchema],
});

const Footer = mongoose.model('Footer', footerSchema);

export default Footer;
