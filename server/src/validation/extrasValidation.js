import * as yup from "yup";

const newsletterSchema = yup.object().shape({
    heading: yup.string().required('Heading is required'),
    subHeading: yup.string().required('Subheading is required'),
    inputPlaceholder: yup.string().required('Input Placeholder is required'),
    btnText: yup.string().required('Button Text is required'),
});

const blockGuideSchema = yup.object().shape({    
    icon: yup.string().required('Icon is required'),
    title: yup.string().required('Title is required'),
    text: yup.string().required('Text is required'),
    delayAnimation: yup.string().required('Delay Animation is required'),
});

export { newsletterSchema, blockGuideSchema }