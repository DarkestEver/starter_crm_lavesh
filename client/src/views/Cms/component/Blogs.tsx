import BlogList from "./blogs/BlogList";
import CMSBackButton from "./common/CMSBackButton";
import { SLICE_NAME } from "./blogs/store/blogSlice";
import { injectReducer } from "@/store";
import reducer from "../store";

injectReducer(SLICE_NAME,reducer)

const Blogs = () => {
  return (<>
    <CMSBackButton route={`/cms`} />
    <BlogList />
  </>)
};

export default Blogs;
