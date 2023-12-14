import { Feed } from "feed";
import pSeoBlogData from '../data/programmaticSeo';

const generateRssFeed = async (posts) => {
  const feed = new Feed({
    title: `${process.env.WEBSITE_NAME}'s RSS Feed`,
    description: "Stay up to date with our latest content",
    id: `${process.env.WEBSITE_NAME}`,
    link: `${process.env.BASE_URL}`,
    language: "en",
    favicon: `${process.env.WEBSITE_NAME}/favicon.jpeg`,
    copyright: `${new Date().getFullYear()} ${process.env.WEBSITE_NAME}`,
    author: {
      name: `${process.env.WEBSITE_NAME}`,
      email: "sales@eurasiaglobal.net",
      link: `${process.env.WEBSITE_NAME}/about`,
    },
  });

  posts.forEach((post) => {
    const keywordsString = post.keywords.map((name) => name).join(', ');
    const itemDescription = `${post.description}\nKeywords: ${keywordsString}`;

    feed.addItem({
      title: post.title,
      id: `${process.env.BASE_URL}/b2bDmc/${post.slug}`,
      link: `${process.env.BASE_URL}/b2bDmc/${post.slug}`,
      description: itemDescription,
      keywords: post.keywords
    });
  });

  return feed.rss2();
};

const Rss = () => {};

export async function getServerSideProps({ res }) {
  const posts = pSeoBlogData;

  const rss = await generateRssFeed(posts);

  res.setHeader("Content-Type", "text/xml");
  res.write(rss);
  res.end();

  return { props: {} };
}

export default Rss;