import AddBanner from "../../components/add-banner/AddBanner";
import BlockGuide from "../../components/block/BlockGuide";
import Blog from "../../components/blog/Blog3";
import CallToActions from "../../components/common/CallToActions";
import DefaultFooter from "../../components/footer/default";
import Destinations from "../../components/home/Destinations";
import Header1 from "../../components/header/header-1";
import Hero1 from "../../components/hero/hero-1";
import Hotels from "../../components/hotels/Hotels2";
import PopularDestinations from "../../components/destinations/PopularDestinations";
import SelectFilter from "../../components/hotels/filter-tabs/SelectFilter";
import Seo from "../../components/common/Seo";
import Testimonial from "../../components/home/Testimonial";
import TestimonialRating from "../../components/home/TestimonialRating";

const structuredData = JSON.stringify({
  "@context": "http://schema.org",
  "@type": "WebSite",
  "name": `${process.env.WEBSITE_NAME}`,
  "url": `${process.env.BASE_URL}`,
  "description": `Your gateway to extraordinary journeys. Explore the world with ${process.env.WEBSITE_NAME} - your trusted travel partner offering unique and unforgettable travel experiences.`,
  "image": `${process.env.BASE_URL}/img/seo/home-page.png`
  // Add more properties as needed
});


const Home = () => {
  
  return (
    <>
      <Seo 
        pageTitle="Home" 
        metaTitle={`${process.env.WEBSITE_NAME} - Your Gateway to Extraordinary Journeys`}
        metaDescription={`Eurasia B2B Global DMC Pvt Ltd is an Destination Management Company (DMC) for TURKEY,RUSSIA,AZERBAIJAN,KAZAKHSTAN,UZBEKISTAN,ARMENIA,GEORGIA.Tour,Holiday,Honeymoon,Packages`}
        ogImage={`${process.env.BASE_URL}/img/seo/home-page.png`}
        ogImageAlt="home-page-image" 
        twitterHandle="@Eurasiab2bdmc" 
        canonicalUrl={`${process.env.BASE_URL}`} 
        robotsContent="index, follow"
        keywords="eurasia global,eurasia global dmc, eurasia DMC, eurasia, eurasia b2b, eurasia b2b dmc"
        structuredDataScript={structuredData}
      />

      <Header1 />

      <Hero1 />

      <section className="layout-pt-lg layout-pb-md" data-aos="fade-up">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Popular Destinations</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
          </div>

          <div className="relative pt-40 sm:pt-20">
            <PopularDestinations />
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-20">
            <AddBanner />
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-10 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Recommended</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Discover Our Handpicked Collection of Exceptional Hotels - Your Ideal Stay Awaits!
                </p>
              </div>
            </div>
            <div className="col-sm-auto">
              <SelectFilter />
            </div>
          </div>

          <div className="relative overflow-hidden pt-40 sm:pt-20 js-section-slider item_gap-x30">
            <Hotels />
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-20 justify-between">
            <BlockGuide />
          </div>
        </div>
      </section>

      
      <section className="layout-pt-lg layout-pb-lg bg-dark-3">
        <div className="container">
          <div className="row y-gap-60">
            <div className="col-xl-5 col-lg-6">
              <TestimonialRating />
            </div>

            <div className="col-xl-4 offset-xl-2 col-lg-5 offset-lg-1 col-md-10">
              <Testimonial />
            </div>
          </div>

        </div>
      </section>
      

      <section className="layout-pt-lg layout-pb-md">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Get inspiration for your next trip
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Explore Travel Blogs for Ultimate Adventure Inspiration
                </p>
              </div>
            </div>
          </div>
          <div className="row y-gap-30 pt-40">
            <Blog />
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Destinations we love</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Embark on a Journey to Our Beloved Destinations
                </p>
              </div>
            </div>
          </div>

          <div className="tabs -pills pt-40 js-tabs">
            <Destinations />
          </div>
        </div>
      </section>

      <CallToActions />

      <DefaultFooter />
    </>
  );
};

export default Home;