import Image from "next/image";

const Banner = ({ destination }) => {
  return (
    <> 
    <div className="col-12">

      <div className="relative d-flex">
        <Image
          src={destination?.img}
          alt="image"
          className="col-12 rounded-4"
          width={500}
          height={500}
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
        
      </div>
    </div>
    </>
  );
};

export default Banner;
