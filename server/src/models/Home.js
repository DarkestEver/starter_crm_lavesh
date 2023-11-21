import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  heroSection: { type: mongoose.Schema.Types.ObjectId , ref: 'HeroSection'},
  middleSection: { type: mongoose.Schema.Types.ObjectId , ref: 'MiddleSection'},
  extras: { type: mongoose.Schema.Types.ObjectId , ref: 'Extras'},
  seo: { type: mongoose.Schema.Types.ObjectId , ref: 'Seo'},
})

const heroSectionSchema = new mongoose.Schema({
  heroSection: {
    heading: String,
    subheading: String,
  },
  mainFilterSearchBox: {
    location: {
      title: String,
      placeholder: String,
    },
    date: {
      title: String,
      placeholder: String,
    },
    guests: {
      title: String,
      placeholder: String,
      guestTypes: [
        {
          name: String,
          defaultValue: String,
        },
      ],
    },
    email: {
      title: String,
      placeholder: String,
    },
    phone: {
      title: String,
      placeholder: String,
    },
  },
});

const middleSectionSchema = new mongoose.Schema({
  popularDestinationHeading: String,
  popularDestinationSubHeading: String,
  recommendedHotelsHeading: String,
  recommendedHotelsSubHeading: String,
  blogsHeading: String,
  blogsSubHeading: String,
  destinationsStatsHeading: String,
  destinationsStatsSubHeading: String,
  blockGuide: Boolean,
});


const extrasSchema = new mongoose.Schema({
  adBannerTitle: String,
  adBannerImage: String,
  adBannerMeta: String,
  adBannerRouterPath: String,
  adBannerDelayAnimation: String,
  testimonialRatingHeading: String,
  testimonialRatingDescription: String,
  testimonialRatingCustomersNumber: String,
  testimonialRatingCustomersText: String,
  testimonialRatingRatingNumber: String,
  testimonialRatingRatingText: String,
});


const HeroSection = mongoose.model('HeroSection', heroSectionSchema);
const MiddleSection = mongoose.model('MiddleSection', middleSectionSchema);
const Extras = mongoose.model('Extras', extrasSchema);
const Home = mongoose.model('Home', homeSchema);

export {
    Home,
    HeroSection,
    MiddleSection,
    Extras
};
