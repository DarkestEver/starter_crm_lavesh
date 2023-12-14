import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";

import Blog from "../../components/blog/Blog3";
import CallToActions from "../../components/common/CallToActions";
import Categories from "../../components/destinations/components/Categories";
import City from "../../components/destinations/City";
import DefaultFooter from "../../components/footer/default";
import DefaultHeader from "../../components/header/default-header";
import Highlights from "../../components/highlights/Highlights";
import Hotels from "../../components/hotels/Hotels2";
import Image from "next/image";
import IntroTown from "../../components/destinations/components/IntroTown";
import Seo from "../../components/common/Seo";
import Testimonial from "../../components/home/Testimonial";
import TestimonialLeftCol from "../../components/home/TestimonialLeftCol";
import Tours from "../../components/tours/Tours";
import { destinations } from "../../data/desinations";

const Destinations =  ({destination}) => {
  console.log(destination)

  return (
    <>
      <Seo 
        pageTitle={`${destination?.country}`}
        metaTitle={`Discover ${destination?.country} - Explore Attractions, Culture, and More`}
        metaDescription={destination?.metaDescription}
        ogImage={`/img/seo/destination-page.PNG`}
        ogImageAlt={`${destination?.country}-page-image`}
        twitterHandle="@Eurasiab2bdmc"
        canonicalUrl={`${process.env.BASE_URL}/destination/${destination?.param}`}
        robotsContent="index, follow"
        keywords={destination?.keywords}
      />

      <div className="header-margin"></div>

      <DefaultHeader />

      <div className="z-2 px-50 py-10 md:py-20 md:px-30">
          <h1 className="text-40 fw-600 text-black lg:text-40 md:text-30">
            Explore {destination?.country}
          </h1>
          <div className="text-black">
            Explore deals, travel guides and things to do in {destination?.country}
          </div>
          
        <Gallery>
          <div className="galleryGrid -type-1 pt-10">

            {destination?.slideImg?.map((image, index) => (
              <div key={index} className="galleryGrid__item">
                <Item
                  original={image}
                  width={350}
                  height={175}
                >
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={image}
                      width={350}
                      height={375}
                      priority={true}
                      quality={60}
                      style={{ maxHeight: "500px", objectFit: "cover", overflow: "hidden" }}
                      alt="destination-image"
                      className="rounded-4"
                      role="button"
                    />
                  )}
                </Item>
              </div>
            ))}
        
          </div>
        </Gallery> 

    </div>

      <section className="">
        <div className="container">

          <div className="row x-gap-20 y-gap-20 items-center pt-20 item_gap-x10">
            <Categories />
          </div>

          <div className="row y-gap-20 pt-40">
            <IntroTown destination={destination} />
          </div>

          <div className="pt-30 mt-30 border-top-light" />
          
        </div>
      </section>

      
      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">{destination?.country} Highlights</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Explore locals&apos; picks for the Best food, hangouts and attractions!
                </p>
              </div>
            </div>
          </div>

          <div className="row y-gap-30 pt-10 sm:pt-20 item_gap-x30">
            <Highlights highlightsData={destination?.highlightsData} />
          </div>
        </div>
      </section>
      
      { destination?.city && <section data-aos="fade-up">
        <div className="container">
          <div className="row justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Popular City/State in {destination?.country}</h2>
                <p className=" sectionTitle__text sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
          </div>

          <div className="relative pt-40 sm:pt-20">
            <City destination={destination} />
          </div>
        </div>
      </section>
      }

      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Recommended Hotels</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Discover Our Handpicked Collection of Exceptional Hotels - Your Ideal Stay Awaits!
                </p>
              </div>
            </div>
            </div>
          <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
            <Hotels />
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Most Popular Tours</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Embark on Unforgettable Adventures – Our Top-Rated Tours Await You
                </p>
              </div>
            </div>
          </div>

          <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
            <Tours />
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-md">
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

      <section className="layout-pt-lg layout-pb-lg bg-light-2">
        <div className="container">
          <div className="row y-gap-40 justify-between">
            <div className="col-xl-5 col-lg-6" data-aos="fade-up">
              <TestimonialLeftCol />
            </div>

            <div className="col-lg-6">
              <div
                className="overflow-hidden js-testimonials-slider-3"
                data-aos="fade-up"
                data-aos-delay="50"
              >
                <Testimonial />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToActions />

      <DefaultFooter />
    </>
  );
};

export default Destinations;
export async function getStaticPaths() {
  const paths = destinations.map((destination) => ({
    params: { country: destination.param },
  }));

  return {
    paths,
    fallback: false, 
  };
}

export async function getStaticProps({ params }) {
  const { country } = params;
  const foundCountry = destinations.find((item) => item.param === country);

  if (!foundCountry) {
    return {
      notFound: true, 
    };
  }

  return {
    props: {
      destination: foundCountry,
    },
  };
}