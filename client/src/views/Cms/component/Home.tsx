import CMSBackButton from "./common/CMSBackButton";
import HomeEdit from "./home/HomeEdit";
import { SLICE_NAME } from "./home/store/homeSlice";
import { injectReducer } from "@/store";
import reducer from "../store";

// injectReducer(SLICE_NAME,reducer)

const Home = () => {
  return <>
    <CMSBackButton route={`/cms`} />
    <HomeEdit />
  </>;
};

export default Home;
