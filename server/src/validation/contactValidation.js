import * as yup from "yup";

const contactSchema = yup.object().shape({
    address: yup.string().required('Address is required'),
    phone: yup.number() .min(1000000000, 'Phone number must be exactly 10 numbers long')
    .max(9999999999, 'Phone number must be exactly 10 numbers long').required('Phone is required'),
    email: yup.string().required('Email is required').email('Invalid email address'),
    socialMediaLinksFacebook: yup.string(),
    socialMediaLinksTwitter: yup.string(),
    socialMediaLinksInstagram: yup.string(),
    socialMediaLinksLinkedin: yup.string(),
  });
  
export default contactSchema