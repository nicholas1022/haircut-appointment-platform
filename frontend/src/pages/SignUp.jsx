import React, { useState } from 'react';
import Header from '../partials/Header';
import Banner from '../partials/Banner';
import CustomerSignUpForm from "../partials/CustomerSignUpForm";
import StylistSignUpForm from "../partials/StylistSignUpForm";

function SignUp() {
  const [isCustomer, setIsCustomer] = useState(true);

  const toggleForm = () => {
    setIsCustomer((prevIsCustomer) => !prevIsCustomer);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />


      {isCustomer ? <CustomerSignUpForm /> : <StylistSignUpForm />}

      <div className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60">
        <div className="bg-slate-800 text-slate-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
          {/* <div className='text-slate-500 inline-flex'><a className="font-medium hover:underline text-slate-50" href="https://github.com/cruip/tailwind-landing-page-template" target="_blank" rel="noreferrer">Download<span className="hidden sm:inline"> on GitHub</span></a> <span className="italic px-1.5">or</span> <a className="font-medium hover:underline text-emerald-400" href="https://cruip.com/simple/" target="_blank" rel="noreferrer">Check Premium Version</a></div> */}
          <button className="text-white hover:text-slate-200 border-gray-700" onClick={toggleForm}>
            {isCustomer ? "Switch to Stylist Sign Up" : "Switch to Customer Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
