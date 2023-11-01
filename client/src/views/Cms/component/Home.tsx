import CMSBackButton from "./common/CMSBackButton";
import HomeEdit from "./home/HomeEdit";

const Home = () => {
  return <>
    <CMSBackButton route={`/cms`} />
    <HomeEdit />
  </>;
};

export default Home;
