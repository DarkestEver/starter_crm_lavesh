import CMSBackButton from "./common/CMSBackButton";
import FooterEdit from "./footer/FooterEdit";
import { SLICE_NAME } from "./footer/store/footerSlice";
import { injectReducer } from "@/store";
import reducer from "../store";

// injectReducer(SLICE_NAME,reducer)

const Footer = () => {
  return <>
    <CMSBackButton route={`/cms`} />
    <FooterEdit />
  </>;
};

export default Footer;
