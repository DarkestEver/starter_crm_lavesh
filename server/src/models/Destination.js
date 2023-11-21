import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  country: { type: String, required: true },
  param: { type: String, required: true },
  thumbnail: { type: String, required: true },
  hoverText: { type: String, required: true },
  slideImg: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    img: { type: String, required: true },
  }],
  description: { type: String, required: true },
  properties: { type: String, required: true },
  timeZone: { type: String, required: true },
  timeBehind: { type: String, required: true },
  currency: { type: String, required: true },
  exchange: { type: String, required: true },
  bestTimeToVisit: { type: String, required: true },
  city: [{
    img: { type: String },
    cityName: { type: String },
    routePath: { type: String },
  }],
  seo: { type: mongoose.Schema.Types.ObjectId , ref: 'Seo'},
});

const Destination = mongoose.model('Destination', destinationSchema);

export default Destination;
