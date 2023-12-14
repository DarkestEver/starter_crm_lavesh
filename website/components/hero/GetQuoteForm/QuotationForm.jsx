import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';

import { DateObject } from "react-multi-date-picker";
import DateSearch from "./DateSearch";
import GuestSearch from "./GuestSearch";
import LocationSearch from "./LocationSearch";
import axios from "axios";
import { useState } from "react";
import { z } from 'zod';

const queryDataSchema = z.object({
  location: z.string().nonempty("Please select location"),
  departureCity: z.string().nonempty("Please enter a departure city"),
  dates: z.array(z.string().refine((date) => typeof date === 'string', { message: "Please select dates" })).refine(
    (arr) => arr.length > 0,
    { message: "Please select dates" }
  ),
  guests: z.object({
    Adults: z.number(),
    Children: z.number(),
    Infant: z.number(),
    Rooms: z.number(),
  }),
  name: z.string().nonempty("Please enter your name"),
  phone: z.string().nonempty("Please enter your mobile number"),
  email: z.string().email().nonempty("Please enter email")
});

const QuotationForm = () => {
  const [ location,setLocation ] = useState("");
  const [ dates,setDates ] = useState([
    new DateObject().setDay(5),
    new DateObject().setDay(14).add(1, "month"),
  ]);
  const [ guests,setGuests ] = useState({
    Adults: 0,
    Children: 0,
    Infant: 0,
    Rooms: 0,
    
  });
  const [ departureCity , setDepartureCity ] = useState("");
  const [ name, setName ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ email, setEmail ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const quoteData = { location,departureCity, name,  dates, guests, phone, email };
    
    try {
        queryDataSchema.parse(quoteData);
      
      axios.post("/api/longQuery", quoteData)
        .then(res => {  
          setLocation("");
          setDepartureCity("");
          setName("");
          setPhone("");
          setEmail("");
  
          toast.success("Query sent successfully!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch(error => {
          toast.error("Something went wrong! Try again later.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } catch (error) {

      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0]?.message || "Validation error";    
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
    }
  }
  };
  
  return (
    <>
      <div className="text-white rounded-4 px-20 py-10 bg-blue-1 w-100" style={{}}>
          <span> Fill out the form for a customized vacation just for you! </span>
      </div>
      <div className="mainSearch -w-auto mx-auto bg-white py-10 px-20 lg:pt-5 pb-20 rounded-4 shadow-1">

                <div className="d-grid items-center">

                  <LocationSearch setLocation={setLocation} location={location} />

                  <div className="searchMenu-date px-20 py-10 js-form-dd js-calendar">
                    <div>
                        <h4 htmlFor="date" className="text-15 fw-500 ls-2 lh-16">Departure & Return Date</h4>
                      <DateSearch setDates={setDates} dates={dates} />
                    </div>
                  </div>
                  
                  <div className="searchMenu-date px-20 py-10 js-form-dd js-calendar">
                      <h4 className="text-15 fw-500 ls-2 lh-16">Departure City</h4>
                    <div className="text-15 text-light-1 ls-2 lh-16">
                      <input className="js-search js-dd-focus px-15 py-10 rounded-4" style={{border: "1px solid black"}} type="text" name="departureCity" id="departureCity" required placeholder="Which city would you like to depart from?" onChange={(e) => setDepartureCity(e.target.value)} value={departureCity}/>
                    </div>
                  </div>

                  <GuestSearch setGuests={setGuests} guests={guests} />

                  
                  <div className="searchMenu-date px-20 py-10 js-form-dd js-calendar">
                      <h4 className="text-15 fw-500 ls-2 lh-16">Your Name</h4>
                    <div className="text-15 text-light-1 ls-2 lh-16">
                      <input className="js-search js-dd-focus px-15 py-10 rounded-4" style={{border: "1px solid black"}} type="text" name="name" id="name" required placeholder="John Doe" onChange={(e) => setName(e.target.value)} value={name}/>
                    </div>
                  </div>
                  
                  <div className="searchMenu-date px-20 py-10 js-form-dd js-calendar">
                      <h4 className="text-15 fw-500 ls-2 lh-16">Mobile Number</h4>
                    <div className="text-15 text-light-1 ls-2 lh-16">
                      <input className="js-search js-dd-focus px-15 py-10 rounded-4" style={{border: "1px solid black"}} type="tel" name="phone" id="phone" required placeholder="+91-XXXXXXXXXX" onChange={(e) => setPhone(e.target.value)} value={phone}/>
                    </div>
                  </div>

                  <div className="searchMenu-date px-20 py-10 js-form-dd js-calendar">
                      <h4 className="text-15 fw-500 ls-2 lh-16">Email Address</h4>        
                    <div className="text-15 text-light-1 ls-2 lh-16">
                      <input className="js-search js-dd-focus px-15 py-10 rounded-4" style={{border: "1px solid black"}} type="email" name="email" id="email" required placeholder="email@gmail.com" onChange={(e) => setEmail(e.target.value)} value={email}/>
                    </div>
                  </div>

                  <div className="button-item px-20">
                    <button
                      className="mainSearch__submit button mt-10 py-15 px-35 h-60 col-12 rounded-22 bg-dark-1 -blue-1 text-white"
                      onClick={(e) => handleSubmit(e)}
                    >
                      <i className="icon-search text-20 mr-10" />
                      Send&nbsp;Query
                    </button>
                    <ToastContainer
                      position="bottom-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                    />
                  </div>
                </div>
              </div>
    </>
  );
};

export default QuotationForm;




















// <section style={{ padding: "1rem 0"}}>
//         <div className="container">
//           <div className="row y-gap-10 justify-between items-center">

//             <div className="col-lg-8">
//               <h2 className="text-30 fw-600 mb-10">{blog?.title}</h2>
//               <div>
//                 <Image src="/img/programmatic-seo/image.jpeg" width={250} height={200} alt={blog?.title} />
//               </div>
//               <div className="no-page">
//                 <div className="pr-30 mt-5">{blog?.description}</div>

//                 <div className="col-auto pt-10">
//                   <div className="row x-gap-10 y-gap-10">
//                     { blog?.keywords?.map((keyword,index) => {
//                       return (<>
//                         <div style={{width: "fit-content"}} className="mr-20 mt-10 button -blue-1 py-5 px-20 bg-blue-1-05 rounded-400 text-15 fw-500 text-blue-1 text-capitalize">
//                           <span key={index} className="col-auto"  >
//                               {keyword}
//                           </span>
//                         </div>
//                       </>)
//                     })}
              
//                   </div>
//                 </div>

//               <div style={{ display: "flex", paddingTop: "1.4rem", gap: "1rem"}}>

//                 <div className="bg-dark-1 -blue-1 text-white d-flex items-center rounded-2">
//                   <Link className="button px-30 fw-400 text-14  h-50 text-white" href="/contact">
//                     Contact
//                   </Link>
//                 </div>
//                 <div className=" bg-dark-1 -blue-1 text-white d-flex items-center rounded-2" >
//                   <Link className="button px-30 fw-400 text-14 h-50 text-white" href="/">
//                     Home Page
//                   </Link>
//                 </div>

//               </div>
                
//               </div>
//             </div>

//             <div className="col-lg-4 sm:my-5">
//               <QuotationForm />
//             </div>

//           </div>

//         </div>
//       </section>
