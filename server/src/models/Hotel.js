import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  slideImg: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    img: { type: String, required: true },
  }],
  img: { type: String, required: true },
  param: { type: String, required: true },
  title: { type: String, required: true },
  btnHref: { type: String, required: true },
  overview: { type: String, required: true },
  location: { type: String, required: true },
  ratings: { type: String, required: true },
  numberOfReviews: { type: String, required: true },
  delayAnimation: { type: String, required: true },
  routePath: { type: String, required: true },
  seo: { type: mongoose.Schema.Types.ObjectId , ref: 'Seo'},
});

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;
