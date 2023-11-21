import * as yup from 'yup';

const seoSchema = yup.object().shape({
  pageTitle: yup.string(),
  metaTitle: yup.string(),
  metaDescription: yup.string(),
  ogImage: yup.string(),
  ogImageAlt: yup.string(),
  twitterHandle: yup.string(),
  canonicalUrl: yup.string(),
  robotsContent: yup.string(),
  keywords: yup.string(),
  structuredDataScript: yup.string(),
});

export default seoSchema;
