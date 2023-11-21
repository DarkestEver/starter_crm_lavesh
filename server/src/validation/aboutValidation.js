import * as yup from "yup";

import seoSchema from "./seoValidation.js";

const aboutValidation = yup.object().shape({
    topHeader: yup.object().shape({
      heading: yup.string().required('topHeader Heading is required'),
      subHeading: yup.string().required('topHeader Subheading is required'),
    }),
    blockGuide: yup.object().shape({
      heading: yup.string().required('blockGuide Heading is required'),
      subHeading: yup.string().required('blockGuide Subheading is required'),
    }),
    mainHeader: yup.object().shape({
      heading: yup.string().required('mainHeader Heading is required'),
      subHeading: yup.string().required('mainHeader Subheading is required'),
      description: yup.string().required('mainHeader Description is required'),
      image: yup.string().required('mainHeader Image is required'),
      counter: yup.boolean()
    }),
    testimonial: yup.object().shape({
      heading: yup.string().required('testimonial Heading is required'),
      subHeading: yup.string().required('testimonial Subheading is required'),
    }),
    seo: seoSchema
});
  

export default aboutValidation