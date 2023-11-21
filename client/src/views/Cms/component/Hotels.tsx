import CMSBackButton from "./common/CMSBackButton";
import HotelList from "./hotels/HotelList";
import { SLICE_NAME } from "./hotels/store/hotelSlice";
import { injectReducer } from "@/store";
import reducer from "../store";

injectReducer(SLICE_NAME, reducer)

const Hotels = () => {
  return (<>
    <CMSBackButton route={`/cms`} />
    <HotelList />
  </>)
};

export default Hotels;
