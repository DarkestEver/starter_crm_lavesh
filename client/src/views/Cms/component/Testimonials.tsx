import CMSBackButton from "./common/CMSBackButton";
import { SLICE_NAME } from './testimonials/store/testimonialSlice';
import TestimonialList from "./testimonials/TestimonialsList";
import { injectReducer } from "@/store";
import reducer from "../store";

injectReducer(SLICE_NAME,reducer)

const Testimonials = () => {
  return <>
    <CMSBackButton route={`/cms`} />
    <TestimonialList />
  </>;
};

export default Testimonials;
