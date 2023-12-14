import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";

import CallToActions from "../../components/common/CallToActions";
import DefaultFooter from "../../components/footer/default";
import Facilities from "../../components/hotel-single/Facilities";
import Header1 from "../../components/header/default-header/index";
import Hotels2 from "../../components/hotels/Hotels2";
import Image from "next/image";
import Link from "next/link";
import Overview from "../../components/hotel-single/Overview";
import PopularFacilities from "../../components/hotel-single/PopularFacilities";
import PropertyHighlights from "../../components/hotel-single/PropertyHighlights";
import RatingTag from "../../components/hotel-single/RatingTag";
import Seo from "../../components/common/Seo";
import SidebarRight from "../../components/hotel-single/SidebarRight";
import StickyHeader from "../../components/hotel-single/StickyHeader";
import { hotelsData } from "../../data/hotels";

const HotelSingleV1Dynamic = ({ hotel }) => {
  
  return (
    <>
      <Seo 
        pageTitle={`${hotel?.title}`}
        metaTitle="Discover Charming Hotels - Your Comfortable Retreats with Eurasia"
        metaDescription="Explore a curated selection of charming hotels across various destinations with Eurasia. Find your perfect home away from home for an unforgettable travel experience."
        ogImage="/img/seo/hotels-page.jpg"
        ogImageAlt="hotels-page-image"
        twitterHandle="@Eurasiab2bdmc"
        canonicalUrl={`${process.env.BASE_URL}/hotels`}
        robotsContent="index, follow"
        keywords="eurasia global,eurasia global dmc, eurasia DMC, eurasia, eurasia b2b, eurasia b2b dmc,Hotels, Accommodations, Charming Stays, Eurasia Hotels, Comfortable Retreats, Travel and Stay, Hotel Deals"
      />

      <div className="header-margin"></div>

      <Header1 />

      <StickyHeader href={hotel?.btnHref} />

      <section className="pt-40">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="row x-gap-20  items-center">
                <div className="col-auto">
                  <h1 className="text-30 sm:text-25 fw-600">{hotel?.title}</h1>
                </div>
                <div className="col-auto">
                  <i className="icon-star text-10 text-yellow-1" />
                  <i className="icon-star text-10 text-yellow-1" />
                  <i className="icon-star text-10 text-yellow-1" />
                  <i className="icon-star text-10 text-yellow-1" />
                  <i className="icon-star text-10 text-yellow-1" />
                </div>
              </div>

              <div className="row x-gap-20 y-gap-20 items-center">
                <div className="col-auto">
                  <div className="d-flex items-center text-15 text-light-1">
                    <i className="icon-location-2 text-16 mr-5" />
                    {hotel?.location}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-auto">
              <div className="row x-gap-15 y-gap-15 items-center">
                <div className="col-auto">
                  <Link
                    href={`${hotel?.btnHref}`}
                    target="_blank"
                    className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                  >
                    Book Hotel <div className="icon-arrow-top-right ml-15" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Gallery>
          <div className="galleryGrid -type-1 pt-30">
            {hotel?.slideImg?.slice(0,5).map((image, index) => (
              <div key={index} className="galleryGrid__item">
                <Item
                  original={image}
                  width={450}
                  height={375}
                >
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={image}
                      width={550}
                      height={375}
                      alt="hotel-image"
                      priority={true}
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
      </section>

      <section className="pt-30">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-8">
              <div className="row y-gap-40">
                <div className="col-12">
                  <h3 className="text-22 fw-500">Property highlights</h3>
                  <PropertyHighlights />
                </div>

                <div id="overview" className="col-12">
                  <Overview overview={hotel?.overview} />
                </div>

                <div className="col-12">
                  <h3 className="text-22 fw-500 pt-40 border-top-light">
                    Most Popular Facilities
                  </h3>
                  <div className="row y-gap-10 pt-20">
                    <PopularFacilities />
                  </div>
                </div>

                <div className="col-12">
                  <RatingTag />
                </div>
              </div>
            </div>

            <div className="col-xl-4">
              <SidebarRight hotel={hotel} />
            </div>
          </div>
        </div>
      </section>


      <section className="mt-40" id="facilities">
        <div className="container">
          <div className="row x-gap-40 y-gap-40">
            <div className="col-12">
              <h3 className="text-22 fw-500">Facilities of this Hotel</h3>
              <div className="row x-gap-40 y-gap-40 pt-20">
                <Facilities />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-40">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="px-24 py-20 rounded-4 bg-light-2">
                <div className="row x-gap-20 y-gap-20 items-center">
                  <div className="col-auto">
                    <div className="flex-center size-60 rounded-full bg-white">
                      <Image
                        width={30}
                        height={30}
                        src="/img/icons/health.svg"
                        alt="icon"
                      />
                    </div>
                  </div>
                  <div className="col-auto">
                    <h4 className="text-18 lh-15 fw-500">
                      Extra health &amp; safety measures
                    </h4>
                    <div className="text-15 lh-15">
                      This property has taken extra health and hygiene measures
                      to ensure that your safety is their priority
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Popular properties similar to {hotel?.title}
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Explore Our Top Hotel Selections in the Area
                </p>
              </div>
            </div>
          </div>

          <div className="pt-40 sm:pt-20 item_gap-x30">
            <Hotels2 />
          </div>
        </div>
      </section>

      <CallToActions />

      <DefaultFooter />
    </>
  );
};

export default HotelSingleV1Dynamic;

export async function getStaticPaths() { 
  const paths = hotelsData.map((hotel) => ({
    params: { hotelName: hotel.param },
  }));

  return {
    paths,
    fallback: false, 
  };
}

export async function getStaticProps({ params }) {
  const { hotelName } = params;
  const foundHotel = hotelsData.find((hotel) => hotel.param === hotelName);

  if (!foundHotel) {
    return {
      notFound: true, 
    };
  }

  return {
    props: {
      hotel: foundHotel,
    },
  };
}

