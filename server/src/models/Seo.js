import mongoose from "mongoose";

const seoSchema = new mongoose.Schema({
    pageTitle: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    ogImage: { type: String },
    ogImageAlt: { type: String },
    twitterHandle: { type: String },
    canonicalUrl: { type: String },
    robotsContent: { type: String },
    keywords: { type: String },
    structuredDataScript: { type: String },
  });

const Seo = mongoose.model('Seo', seoSchema);

export default Seo;
