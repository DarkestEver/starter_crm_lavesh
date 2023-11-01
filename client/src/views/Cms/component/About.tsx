import AboutEdit from "./about/AboutEdit";
import CMSBackButton from "./common/CMSBackButton";

const About = () => {
  return (<>
    <CMSBackButton route={`/cms`} />
    <AboutEdit />
  </>)
};

export default About;
