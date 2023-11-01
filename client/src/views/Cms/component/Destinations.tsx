import CMSBackButton from "./common/CMSBackButton";
import DestinationList from "./destinations/DestinationList";

const Destinations = () => {
  return <>
    <CMSBackButton route={`/cms`} />
    <DestinationList />
  </>;
};

export default Destinations;
