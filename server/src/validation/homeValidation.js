import * as yup from 'yup';

import seoSchema from './seoValidation.js';

// Validation schema for the hero section
const heroSectionSchema = yup.object().shape({
  heading: yup.string().required(),
  subheading: yup.string().required(),
  mainFilterSearchBox: yup.object().shape({
    location: yup.object().shape({
      title: yup.string().required(),
      placeholder: yup.string().required(),
    }),
    date: yup.object().shape({
      title: yup.string().required(),
      placeholder: yup.string().required(),
    }),
    guests: yup.object().shape({
      title: yup.string().required(),
      placeholder: yup.string().required(),
      guestTypes: yup.array().of(
        yup.object().shape({
          name: yup.string().required(),
          defaultValue: yup.string().required(),
        })
      ),
    }),
    email: yup.object().shape({
      title: yup.string().required(),
      placeholder: yup.string().required(),
    }),
    phone: yup.object().shape({
      title: yup.string().required(),
      placeholder: yup.string().required(),
    }),
  }),
});

// Validation schema for the middle section
const middleSectionSchema = yup.object().shape({
  popularDestinationHeading: yup.string().required(),
  popularDestinationSubHeading: yup.string().required(),
  recommendedHotelsHeading: yup.string().required(),
  recommendedHotelsSubHeading: yup.string().required(),
  blogsHeading: yup.string().required(),
  blogsSubHeading: yup.string().required(),
  destinationsStatsHeading: yup.string().required(),
  destinationsStatsSubHeading: yup.string().required(),
  blockGuide: yup.boolean().required(),
});

// Validation schema for the extras section
const extrasSchema = yup.object().shape({
  adBannerTitle: yup.string().required(),
  adBannerImage: yup.string().required(),
  adBannerMeta: yup.string().required(),
  adBannerRouterPath: yup.string().required(),
  adBannerDelayAnimation: yup.string().required(),
  testimonialRatingHeading: yup.string().required(),
  testimonialRatingDescription: yup.string().required(),
  testimonialRatingCustomersNumber: yup.string().required(),
  testimonialRatingCustomersText: yup.string().required(),
  testimonialRatingRatingNumber: yup.string().required(),
  testimonialRatingRatingText: yup.string().required(),
});

// Validation schema for the home schema
const homeSchema = yup.object().shape({
  heroSection: heroSectionSchema,
  middleSection: middleSectionSchema,
  extras: extrasSchema,
  seo: seoSchema
});

export default homeSchema;
