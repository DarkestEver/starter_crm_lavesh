import CMSBackButton from "./common/CMSBackButton";
import HotelList from "./hotels/HotelList";

const Hotels = () => {
  return (<>
    <CMSBackButton route={`/cms`} />
    <HotelList />
  </>)
};

export default Hotels;
