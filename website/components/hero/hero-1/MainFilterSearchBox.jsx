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
  location: z.string().nonempty(),
  dates: z.array(z.string()).nonempty(),
  guests: z.object({
    Adults: z.number(),
    Children: z.number(),
    Infant: z.number(),
    Rooms: z.number(),
  }),
  phone: z.string().nonempty(),
  email: z.string().nonempty(),
});

const MainFilterSearchBox = () => {
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
  const [ phone,setPhone ] = useState("");
  const [ email,setEmail ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const quoteData = { location, dates, guests, phone, email };
    console.log(quoteData)
  
    try {
      queryDataSchema.parse(quoteData);

      axios.post("/api/query", quoteData)
        .then(res => {
          console.log(res.data);
  
          setLocation("");
          setDates([
            new DateObject().setDay(5),
            new DateObject().setDay(14).add(1, "month"),
          ]);
          setGuests({
            Adults: 0,
            Children: 0,
            Infant: 0,
            Rooms: 0,
          });
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
      toast.error("Please fill in all fields.", {
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
  };
  
  return (
    <>
      <div className="mainSearch -col-5 -w-1070 mx-auto bg-white pr-20 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-4 shadow-1">
        <div className="button-grid items-center">

          <LocationSearch setLocation={setLocation} location={location} />
          
          <div className="searchMenu-date px-20 lg:py-20 lg:px-0 js-form-dd js-calendar">
            <div>
              {/* <h4 className="text-15 fw-500 ls-2 lh-16">CheckIn - CheckOut</h4> */}
              <DateSearch setDates={setDates} dates={dates} />
            </div>
          </div>

          <GuestSearch setGuests={setGuests} guests={guests} />

          <div className="searchMenu-date px-20 lg:py-20 lg:px-0 js-form-dd js-calendar">
            <div>
              {/* <h4 className="text-15 fw-500 ls-2 lh-16">Email</h4> */}
              <input type="email" name="email" id="email" required placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
          </div>
          <div className="searchMenu-date px-20 lg:py-20 lg:px-0 js-form-dd js-calendar">
            <div>
              {/* <h4 className="text-15 fw-500 ls-2 lh-16">Phone</h4> */}
              <input type="text" name="phone" id="phone" required placeholder="Phone" onChange={(e) => setPhone(e.target.value)} value={phone}/>
            </div>
          </div>
          <div className="button-item">
            <button
              className="mainSearch__submit button  py-15 px-35 h-60 col-12 rounded-4 bg-dark-1 -blue-1 text-white"
              onClick={(e) => handleSubmit(e)}
            >
              <i className="icon-search text-20 mr-10" />
              Get&nbsp;Query
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

export default MainFilterSearchBox;
