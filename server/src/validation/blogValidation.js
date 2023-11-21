import * as yup from "yup";

import seoSchema from "./seoValidation.js";

const blogSchema = yup.object().shape({
  img: yup.string().required('Image is required'),
  title: yup.string().required('Title is required'),
  param: yup.string().required('Parameter is required'),
  date: yup.string().required('Date is required'),
  delayAnimation: yup.string()
    .required('Delay Animation is required')
    .matches(/^(100|200|300|400)$/, 'Invalid Delay Animation'),
  details: yup.string().required('Blog Content is required'),
  tag: yup.array().of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
        __isNew__: yup.boolean()
      })
    ),
    seo: seoSchema
});


export default blogSchema