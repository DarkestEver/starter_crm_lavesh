import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';

import axios from "axios";
import { useState } from "react";
import { z } from "zod";

const emailSchema = z.string().email();

const CallToActions = () => {
  const [ email, setEmail ] = useState('');

  const handleEmail = (e) => {
    e.preventDefault();
    try{
      emailSchema.parse(email);
      axios.post('/api/newsletter',{email})
      .then(() => {
        setEmail('')
        toast.success("Subscribed successfully!", {
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
      .catch((error) => {
        console.error(error)
        toast.error("Something went wrong! Try again later.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      })
    }catch(err) {
      toast.error("Invalid email address! Please enter a valid email.",{
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  return (
    <section className="layout-pt-md layout-pb-md bg-dark-2">
      <div className="container">
        <div className="row y-gap-30 justify-between items-center">
          <div className="col-auto">
            <div className="row y-gap-20  flex-wrap items-center">
              <div className="col-auto">
                <div className="icon-newsletter text-60 sm:text-40 text-white" />
              </div>
              <div className="col-auto">
                <strong className="text-26 text-white fw-600">
                  Ghooma nahi to kya kiya ?
                </strong>
                <div className="text-white">
                  Sign up and we`&apos;ll send the best deals to you
                </div>
              </div>
            </div>
          </div>

          <div className="col-auto">
            <div className="single-field -w-410 d-flex x-gap-10 y-gap-20">
              <div>
                <input
                  className="bg-white h-60"
                  type="email"
                  placeholder="Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div>
                <button className="button -md h-60 bg-blue-1 text-white" onClick={(e) => handleEmail(e)}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </section>
  );
};

export default CallToActions;
