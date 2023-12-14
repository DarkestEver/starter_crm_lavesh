import Image from "next/image";

const Highlights = ({highlightsData}) => {

  return (
    <>
      {highlightsData?.map((item,index) => (
        <div
          className="col-lg-4 col-sm-6"
          data-aos="fade"
          key={index}
        >
          <div className="ctaCard -type-1 rounded-4 ">
            <div className="ctaCard__image ratio ratio-41:45">
              <Image
                width={410}
                height={455}
                className="js-lazy img-ratio"
                src={item.img}
                alt={item.title}
              />
            </div>
            <div className="ctaCard__content py-50 px-50 lg:py-30 lg:px-30">
              
                <div className="text-15 fw-500 text-white mb-10">
                  {item?.meta}
                </div>

              <h4 className="text-30 lg:text-24 text-white">{item.title}</h4>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Highlights;
