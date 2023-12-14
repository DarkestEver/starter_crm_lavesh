import React, { useEffect } from "react";

import CallToActions from "../../components/common/CallToActions";
import DefaultFooter from "../../components/footer/default";
import DefaultHeader from "../../components/header/default-header";
import Link from "next/link";
import Seo from "../../components/common/Seo";
import { getB2bDmcTitle } from './../../utils/dynamicDataUrl';

const index = ({ blogs }) => {

  const blogsPerColumn = Math.ceil(blogs.length / 3);

  const renderColumn = (start, end) => {
    return blogs.slice(start, end).map((blog, index) => (
      <Link href={`/b2bDmc/${blog?.slug}`} key={index}>
        <p className="mt-5">{blog?.title}</p>
      </Link>
    ));
  };


  return <>
    <Seo
        pageTitle="RSS Feed"
        metaTitle=""
        metaDescription=""
        ogImage={`/img/programmatic-seo/eurasia-b2bDmc-image2.jpg`}
        ogImageAlt={`programmatic seo Image`}
        twitterHandle="@Eurasiab2bdmc"
        canonicalUrl={`${process.env.BASE_URL}/b2bDmc`}
        robotsContent="index, follow"
        keywords="eurasia global,eurasia global dmc, eurasia DMC, eurasia, eurasia b2b, eurasia b2b dmc,rss-feed, seo"
        structuredDataScript=""
    />

    <div className="header-margin"></div>

    <DefaultHeader /> 

    <section className="layout-pt-sm layout-pb-sm bg-blue-2">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-xl-6 col-lg-8 col-md-10">
            <h1 className="text-40 md:text-25 fw-600 text-black">
              RSS Feed 
            </h1>
            <div className="text-blue mt-5">
              {process.env.WEBSITE_NAME}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="layout-pt-md" style={{marginBottom: "3rem"}}>
        <div className="container">
          <div className="row y-gap-30 justify-between">

            <div className="col-lg-4">
              {renderColumn(2 * blogsPerColumn, blogs.length)}
            </div>
           
            <div className="col-lg-4">
              {renderColumn(blogsPerColumn, 2 * blogsPerColumn)}
            </div>

            <div className="col-lg-4">
              {renderColumn(0, blogsPerColumn)}
            </div>

          </div>
        </div>
    </section>

    <CallToActions />

    <DefaultFooter />

  </>;
};

export default index;

export async function getStaticProps() {
  const serverBlogs = getB2bDmcTitle();

  return {
    props: {
      blogs: serverBlogs,
    }
  };
}


