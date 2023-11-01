import CMSBackButton from "./common/CMSBackButton";
import TestimonialList from "./testimonials/TestimonialsList";

const Testimonials = () => {
  return <>
    <CMSBackButton route={`/cms`} />
    <TestimonialList />
  </>;
};

export default Testimonials;
