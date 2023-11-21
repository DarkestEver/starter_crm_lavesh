import * as yup from "yup";

const testimonialSchema = yup.object().shape({
    name: yup.string()
      .required('User Name is required')
      .min(3, 'Name should be at least 3 characters long'),
    avatar: yup.string().required('Avatar is required'),
    designation: yup.string().required('Designation is required'),
    text: yup.string().required('Testimonial Text is required'),
    delayAnimation: yup.string()
      .required('Delay Animation is required')
      .oneOf(['100', '200', '300', '400'], 'Invalid Delay Animation value'),
    published: yup.boolean().required('Visibility status is required'),
});

export default testimonialSchema