import CallToActions from "../components/common/CallToActions";
import DefaultFooter from "../components/footer/default";
import DefaultHeader from "../components/header/default-header";
import Seo from "../components/common/Seo";
import TermsConent from "../components/common/TermsConent";

const Terms = () => {
  return (
    <>
      <Seo pageTitle="Terms & Conditions" />

      <div className="header-margin"></div>

      <DefaultHeader />

      <section className="layout-pt-sm layout-pb-lg">
        <div className="container">
          <div className="tabs js-tabs">
            <TermsConent />
          </div>
        </div>
      </section>

      <CallToActions />

      <DefaultFooter />
    </>
  );
};

export default Terms;
