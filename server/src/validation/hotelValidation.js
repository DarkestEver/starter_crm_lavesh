import * as yup from "yup";

import seoSchema from "./seoValidation.js";

const hotelSchema = yup.object().shape({
    tag: yup.string().required('Tag is required'),
    slideImg: yup.array()
      .required('Hotel Images are required')
      .min(1, 'At least one slide image is required'),
    img: yup.string().required('Image is required'),
    param: yup.string().required('Param is required'),
    title: yup.string().required('Title is required'),
    btnHref: yup.string().required('Button Href is required'),
    overview: yup.string().required('Overview is required'),
    location: yup.string().required('Location is required'),
    ratings: yup.string()
      .required('Ratings are required')
      .matches(/^\d+(\.\d+)?$/, 'Ratings must be a number'),
    numberOfReviews: yup.string()
      .required('Number of Reviews is required')
      .matches(/^[0-9]+$/, 'Number of Reviews must be a valid number'),
    delayAnimation: yup.string()
      .required('Delay Animation is required')
      .matches(/^(100|200|300|400)$/, 'Delay Animation must be 100, 200, 300, or 400'),
    routePath: yup.string().required('Route Path is required'),
    seo: seoSchema
});

export default hotelSchema