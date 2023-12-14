import { getB2bDmcUrl, getBlogsUrl, getDestinationUrl, getHotelUrl } from "../utils/dynamicDataUrl"

import fs from "fs";

const Sitemap = () => {};

export const getServerSideProps = ({ res }) => {
  // const baseUrl = {
  //   development: "http://localhost:5000",
  //   production: "https://mydomain.com",
  // }[process.env.BASE_URL];
  
  const blogsUrl = getBlogsUrl();
  const destinationUrl = getDestinationUrl();
  const hotelUrl = getHotelUrl();
  const b2bDmcUrl = getB2bDmcUrl();

  const staticPages = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "api",
        "_app.js",
        "_document.js",
        "index.js",
        "layout",
        "sitemap.xml.js",
        "feed.xml.js",
        "b2bDmc",
        "destination",
        "hotel",
        "coming-soon.js",
        "404.js",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${process.env.BASE_URL}/${staticPagePath}`;
    });

    const urls = staticPages.concat(blogsUrl, destinationUrl,hotelUrl,b2bDmcUrl)

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"  >
      ${urls
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;





















// import siteData from '../data/sitemapUrl';

// function generateSiteMap(sitemapData) {
//   return `<?xml version="1.0" encoding="UTF-8"?>
//    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//      ${sitemapData.map((item) => {
//          return `
//        <url>
//           <loc>${`${process.env.BASE_URL}${item.url}`}</loc>
//           <lastmod>${item.lastmod}</lastmod>
//           <changefreq>${item.changefreq}</changefreq>
//           <priority>${item.priority}</priority>
//        </url>
//      `;
//        })
//        .join('')}
//    </urlset>
//  `;
// }

// function SiteMap() {
//   return null;
// }

// export async function getServerSideProps({ res }) {
//   const sitemapUrl = siteData;
  
//   const sitemap = generateSiteMap(sitemapUrl);

//   res.setHeader('Content-Type', 'text/xml');

//   res.write(sitemap);
//   res.end();

//   return {
//     props: {},
//   };
// }

// export default SiteMap;
