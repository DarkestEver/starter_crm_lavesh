import Block1 from "../components/about/Block1";
import CallToActions from "../components/common/CallToActions";
import Counter from "../components/counter/Counter";
import DefaultFooter from "../components/footer/default";
import DefaultHeader from "../components/header/default-header";
import Image from "next/image";
import Seo from "../components/common/Seo";
import Team1 from "../components/team/Team1";
import Testimonial from "../components/testimonial/Testimonial";
import WhyChoose from "../components/block/BlockGuide";

const About = () => {
  return (
    <>
      <Seo 
        pageTitle="About"
        metaTitle={`Discover Our Story - About ${process.env.WEBSITE_NAME}`}
        metaDescription={`Learn about ${process.env.WEBSITE_NAME}, your gateway to unforgettable travel experiences. Explore our history, mission, and passion for creating memorable journeys.`}
        ogImage="/img/seo/about-page.PNG"
        ogImageAlt="about-page-image"
        twitterHandle="@Eurasiab2bdmc"
        canonicalUrl={`${process.env.BASE_URL}/about`}
        robotsContent="index, follow"
        keywords={`Travel Company,Unforgettable Journeys,Travel Stories,Passion for Travel`}
      />

      <div className="header-margin"></div>

      <DefaultHeader />

      <section className="section-bg layout-pt-lg layout-pb-lg">
        <div className="section-bg__item col-12">
          <Image
            width={1920}
            height={400}
            src="/img/pages/about/1.png"
            alt="image"
            priority
          />
        </div>

        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <h1 className="text-40 md:text-25 fw-600 text-white">
                Looking for joy?
              </h1>
              <div className="text-white mt-15">
                Your trusted trip companion
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-lg layout-pb-md">
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

      <section className="layout-pt-md">
        <div className="container">
          <div className="row y-gap-30 justify-between items-center">
            <Block1 />
          </div>
        </div>
      </section>

      <section className="pt-60">
        <div className="container">
          <div className="border-bottom-light pb-40">
            <div className="row y-gap-30 justify-center text-center">
              <Counter />
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Our Team</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Your travel solution architects, working to make your journeys effortlessly smooth.
                </p>
              </div>
            </div>
          </div>

          <div className=" pt-40 js-section-slider">
            <div className="item_gap-x30">
              <Team1 />
            </div>
          </div>
        </div>
      </section>

      <section className="section-bg layout-pt-lg layout-pb-lg">
        <div className="section-bg__item -mx-20 bg-light-2" />
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Overheard from travelers
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden pt-80 js-section-slider">
            <div className="item_gap-x30">
              <Testimonial />
            </div>
          </div>

        </div>
      </section>

      <CallToActions />

      <DefaultFooter />
    </>
  );
};

export default About;
