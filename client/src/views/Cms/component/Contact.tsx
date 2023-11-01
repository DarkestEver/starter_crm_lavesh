import CMSBackButton from "./common/CMSBackButton";
import ContactEdit from "./contact/ContactEdit";

const Contact = () => {
  return (<>
    <CMSBackButton route={`/cms`} />
    <ContactEdit />
  </>);
};

export default Contact;
