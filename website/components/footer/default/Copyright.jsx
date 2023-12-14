import Link from "next/link";

const Copyright = () => {
  return (
    <div className="row justify-between items-center y-gap-10">
      <div className="col-auto col-xl-8">
        <div className="row x-gap-30 y-gap-10">
          <div className="col-auto col-xl-6">
            <div className="d-flex items-center">
              © {new Date().getFullYear()} 
              <span className="mx-2"> 
                by Eurasia All rights reserved.
              </span>
            </div>
          </div>

          <div className="col-auto col-xl-6 items-center">
            <div className="d-flex x-gap-15 items-center">
              <Link href="/terms" className="underline" >Privacy</Link>
              <Link href="/terms" className="underline" >Terms</Link>
              <Link href="/sitemap.xml" className="underline" >Site Map</Link>
              <Link href="/b2bDmc" className="underline" >RSS Feed</Link>
            </div>
          </div>

        </div>
      </div>

      <div className="col-auto col-xl-4">
        <div className="row y-gap-10 items-center justify-content-end">
          <div className="col-auto">
            <div className="d-flex items-center">
              <button className="d-flex items-center text-14 fw-500 text-dark-1 mr-10">
                <i className="icon-globe text-16 mr-10" />
                  Developed By &nbsp; 
                <Link href="https://prishavtechnologies.com" >
                  <span className="underline" style={{fontWeight: "bold"}}>
                    Prishav Technologies
                  </span>
                </Link>
              </button>
            </div>
          </div>

          {/* <div className="col-auto">
            <div className="d-flex x-gap-20 items-center">
             <Social2 />
            </div>
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default Copyright;
