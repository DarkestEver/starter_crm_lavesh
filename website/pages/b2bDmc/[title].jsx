import { BsFillTagFill } from "react-icons/bs";
import CallToActions from "../../components/common/CallToActions";
import DefaultFooter from "../../components/footer/default";
import DefaultHeader from "../../components/header/default-header";
import Image from "next/image";
import Link from "next/link";
import QuotationForm from "../../components/hero/GetQuoteForm/QuotationForm"
import React from "react";
import Seo from "../../components/common/Seo";
import pSeoBlogData from '../../data/programmaticSeo';
import parse from 'html-react-parser';

const ProgrammaticSeo = ({ blog }) => {
  
  return (
    <>
      <Seo 
        pageTitle={`${blog?.title}`}
        metaTitle={`Explore ${blog?.title} - Where Tradition Meets Modernity`}
        metaDescription={blog?.metaDescription}
        ogImage={`/img/programmatic-seo/${blog?.image}`}
        ogImageAlt={`${blog?.title} Blog Image`}
        twitterHandle="@Eurasiab2bdmc"
        canonicalUrl={`${process.env.BASE_URL}/b2bDmc/${blog?.slug}`}
        robotsContent="index, follow"
        keywords={blog?.keyword}
      />

      <div className="header-margin"></div>

      <DefaultHeader />

      <section style={{ padding: "1rem 0"}}>
        <div className="container">

          <div className="row justify-between items-center">
            <h2 className="text-30 fw-600">{blog?.title.toUpperCase()}</h2>

            <div className="col-auto mb-20">
                <div className="row x-gap-10 y-gap-10">
                  { blog?.keyword?.map((key,index) => {
                    return (<>
                      <div key={index} style={{width: "fit-content", border: "1px solid blue"}} className="mr-10 mt-10 button  -blue-1 py-5 px-10 rounded-100 text-12 fw-500 text-blue-1 text-capitalize">
                        <span className="col-auto"  >
                            <BsFillTagFill className='mr-5' />
                            {key}
                        </span>
                      </div>
                    </>)
                  })}

                </div>
            </div>
          </div>

          <div className="row y-gap-10">

            <div className="col-lg-7">

              <div className="w-100 overflow-hidden" style={{height:"350px"}}>
                <Image src={`/img/programmatic-seo/${blog?.image}`} style={{objectFit:"cover"}} width={750} height={200} alt={blog?.title} />
              </div>
              <div className="no-page">
                <div className="pr-30 mt-5">
                  {
                    parse(blog?.description)
                  }
                </div>

                <div style={{ display: "flex", paddingTop: "1rem", gap: "1rem"}}>

                  <div className="bg-dark-1 -blue-1 text-white d-flex items-center rounded-2">
                    <Link className="button px-30 fw-400 text-14  h-50 text-white" href="/contact">
                      Contact
                    </Link>
                  </div>
                  <div className=" bg-dark-1 -blue-1 text-white d-flex items-center rounded-2" >
                    <Link className="button px-30 fw-400 text-14 h-50 text-white" href="/">
                      Home Page
                    </Link>
                  </div>

                </div>
                
              </div>
            </div>

            <div className="col-lg-5 sm:my-5">
              <QuotationForm />
            </div>

          </div>

        </div>
      </section>

      <CallToActions />

      <DefaultFooter />
    </>
  );
};

export default ProgrammaticSeo;

export async function getStaticPaths() {
  const paths = pSeoBlogData.map((blog) => ({
    params: { title: blog.slug },
  }));

  return {
    paths,
    fallback: false, 
  };
} 

export async function getStaticProps({ params }) {
  const { title } = params;
  const foundBlog = pSeoBlogData.find((blog) => blog.slug === title );

  if (!foundBlog) {
    return {
      notFound: true, 
    };
  }

  return {
    props: {
      blog: foundBlog,
    },
  };
}

