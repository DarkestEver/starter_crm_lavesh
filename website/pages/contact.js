import Address from "../components/block/Address";
import CallToActions from "../components/common/CallToActions";
import ContactForm from "../components/common/ContactForm";
import DefaultFooter from "../components/footer/default";
import DefaultHeader from "../components/header/default-header";
import Seo from "../components/common/Seo";
import Social from "../components/common/social/Social";
import WhyChoose from "../components/block/BlockGuide";

const Contact = () => {
  return (
    <>
      <Seo 
        pageTitle="Contact"
        metaTitle="Get In Touch - Contact Eurasia"
        metaDescription={`Connect with Eurasia B2B Global DMC  - Your Travel Companion. For travel inquiries, booking assistance, and to get in touch, feel free to contact us. `}
        ogImage="/img/seo/contact-page.PNG"
        ogImageAlt="contact page-image" 
        twitterHandle="@Eurasiab2bdmc" 
        canonicalUrl={`${process.env.BASE_URL}/contact`} 
        robotsContent="index, follow"
        keywords="Eurasia,contact us,get in touch,travel inquiries,booking assistance"
      />


      <div className="header-margin"></div>

      <DefaultHeader />

      
      <div className="map-outer">
        <div className="map-canvas">
          <iframe
            title="Noida, India Map"
            loading="lazy"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.2642216655867!2d77.39102651439516!3d28.535516982443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4d5e9317dd9%3A0x5d7a6c4eaa57c4d6!2sNoida%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1670824458615!5m2!1sen!2sus"
          ></iframe>
        </div>
      </div>


      <section className="relative container">
        <div className="row justify-end">
          <div className="col-xl-5 col-lg-7">
            <div className="map-form px-40 pt-40 pb-50 lg:px-30 lg:py-30 md:px-24 md:py-24 bg-white rounded-4 shadow-4">
              <div className="text-22 fw-500">Send a message</div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row x-gap-80 y-gap-20 justify-between">
            <div className="col-12">
              <div className="text-30 sm:text-24 fw-600">Contact Us</div>
            </div>

            <Address />

            <div className="col-auto">
              <div className="text-14 text-light-1">
                Follow us on social media
              </div>
              <div className="d-flex x-gap-20 items-center mt-10">
                <Social />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-lg layout-pb-lg bg-blue-2">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Why Choose Us</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
          </div>

          <div className="row y-gap-40 justify-between pt-50">
            <WhyChoose />
          </div>
        </div>
      </section>

      <CallToActions />

      <DefaultFooter />
    </>
  );
};

export default Contact;
