import CMSBackButton from "./common/CMSBackButton";
import FooterEdit from "./footer/FooterEdit";

const Footer = () => {
  return <>
    <CMSBackButton route={`/cms`} />
    <FooterEdit />
  </>;
};

export default Footer;
