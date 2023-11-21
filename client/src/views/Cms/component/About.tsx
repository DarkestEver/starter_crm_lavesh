import AboutEdit from "./about/AboutEdit";
import CMSBackButton from "./common/CMSBackButton";
import { SLICE_NAME } from "./about/store/aboutSlice";
import { injectReducer } from "@/store";
import reducer from "../store";

injectReducer(SLICE_NAME,reducer)

const About = () => {
  return (<>
    <CMSBackButton route={`/cms`} />
    <AboutEdit />
  </>)
};

export default About;
