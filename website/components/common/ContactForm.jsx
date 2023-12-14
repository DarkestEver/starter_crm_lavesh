import 'react-toastify/dist/ReactToastify.css';

import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be 2 or more characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: 'Must be a valid mobile number' })
  .max(14, { message: 'Must be a valid mobile number' }),
  message: z.string(),
});

const ContactForm = () => {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isCaptchaVerified) {
      toast.error("Please verify the reCAPTCHA.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return; 
    }

    try {
      const validatedData = contactFormSchema.parse(formData);

      axios
        .post("/api/emails", validatedData)
        .then((res) => {
          
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          setIsCaptchaVerified(false);
          toast.success("Email sent successfully!", {
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
        });
    } catch (error) {
    
      error.errors.forEach((errorMsg) => {
        toast.error(errorMsg.message, {
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
    }
  };
  
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  
  function onChange(value) {
    // console.log("Captcha value:", value);
    setIsCaptchaVerified(true);
  }

  return (
    <form className="row y-gap-20 pt-20" onSubmit={handleSubmit}>
      <div className="col-12">
        <div className="form-input">
          <input 
            type="text" 
            id="name"
            onChange={handleChange}
            value={formData.name} 
            required 
          />
          <label htmlFor="name" className="lh-1 text-16 text-light-1">
            Full Name
          </label>
        </div>
      </div>
      <div className="col-12">
        <div className="form-input">
          <input 
            type="email" 
            id="email"
            onChange={handleChange}
            value={formData.email} 
            required 
          />
          <label htmlFor="email" className="lh-1 text-16 text-light-1">
            Email
          </label>
        </div>
      </div>
      <div className="col-12">
        <div className="form-input">
          <input 
            type="tel" 
            id="phone"
            onChange={handleChange}
            value={formData.phone} 
            required 
          />
          <label htmlFor="phone" className="lh-1 text-16 text-light-1">
            Phone
          </label>
        </div>
      </div>
      <div className="col-12">
        <div className="form-input">
          <textarea 
            id="message" 
            required rows="4"    
            onChange={handleChange}
            value={formData.message}>
            </textarea>
          <label htmlFor="message" className="lh-1 text-16 text-light-1">
            Your Message
          </label>
        </div>
      </div>
      <div className="col-12">
        <ReCAPTCHA
          sitekey={process.env.GOOGLE_SITE_KEY}
          onChange={onChange}
        />
      </div>
      <div className="col-auto">
        <button
          type="submit"
          className="button px-24 h-50 -dark-1 bg-blue-1 text-white"
        >
          Send Message <div className="icon-arrow-top-right ml-15"></div>
        </button>
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
    </form>
  );
};

export default ContactForm;
