import BlogList from "./blogs/BlogList";
import CMSBackButton from "./common/CMSBackButton";

const Blogs = () => {
  return (<>
    <CMSBackButton route={`/cms`} />
    <BlogList />
  </>)
};

export default Blogs;
