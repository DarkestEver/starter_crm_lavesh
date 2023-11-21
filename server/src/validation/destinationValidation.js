import * as yup from "yup";

import seoSchema from "./seoValidation.js";

const destinationSchema = yup.object().shape({
    hoverText: yup.string().required(),
    param: yup.string().required(),
    country: yup.string().required(),
    slideImg: yup.array()
      .required('Hotel Images are required')
      .min(1, 'At least one slide image is required'),
    thumbnail: yup.string().required(),
    description: yup.string().required(),
    timeZone: yup.string().required(),
    properties: yup.string().required().matches(/^\d+$/, 'Properties must be a number'),
    timeBehind: yup.string().required(),
    currency: yup.string().required(),
    exchange: yup.string().required(),
    bestTimeToVisit: yup.string().required(),
    city: yup.array().of(
      yup.object().shape({
        img: yup.string(),
        cityName: yup.string().min(3,'required 3 letters'),
        routePath: yup.string(),
      })
    ),
    seo: seoSchema
  });

export default destinationSchema