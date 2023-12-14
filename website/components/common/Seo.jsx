import Head from "next/head";

const Seo = ({ pageTitle, metaTitle, metaDescription ,ogImage,ogImageAlt, twitterHandle, canonicalUrl, robotsContent,keywords,structuredDataScript }) => (
  <>
    <Head>
      <title>
        {pageTitle &&
          `${pageTitle} || ${process.env.WEBSITE_NAME}`}
      </title>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataScript }}
      />

      {metaTitle && <meta name="title" content={metaTitle} />}
      {metaDescription && <meta name="description" content={metaDescription} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={metaTitle || pageTitle} />
      <meta
        property="og:description"
        content={metaDescription || "Eurasia"}
      />
      <meta property="og:type" content="website" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      { ogImage && <meta
        property="og:image"
        content={ogImage || "https://example.com/image.jpg"}
      /> }
      { ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} /> }

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle || pageTitle} />
      <meta
        name="twitter:description"
        content={metaDescription || "Eurasia"}
      />
      <meta name="twitter:site" content={twitterHandle || "@eurassia"} />
      { ogImage && <meta
        name="twitter:image"
        content={ogImage}
      /> }
      { ogImageAlt && <meta name="twitter:image:alt" content={ogImageAlt} /> }

      {/* Robots Meta Tag */}
      <meta name="robots" content={robotsContent || "index, follow"} />

      {/* Canonical Tag */}
      { canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta
        name="keywords"
        content={keywords}
      />
    </Head>
  </>
);

export default Seo;
