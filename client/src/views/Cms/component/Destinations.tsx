import CMSBackButton from "./common/CMSBackButton";
import DestinationList from "./destinations/DestinationList";
import { SLICE_NAME } from './destinations/store/destinationSlice';
import { injectReducer } from "@/store";
import reducer from "../store";

// injectReducer(SLICE_NAME,reducer)

const Destinations = () => {
  return <>
    <CMSBackButton route={`/cms`} />
    <DestinationList />
  </>;
};

export default Destinations;
