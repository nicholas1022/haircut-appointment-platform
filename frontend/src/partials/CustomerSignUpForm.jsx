import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Modal from '../utils/Modal';
import Welcome from '../images/welcome.png';
import {signUpUser, getAll} from "../network/userCrud";

function CustomerSignUpForm() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [modalOpen, setModalOpen] = React.useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const result = signUpUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password
    })
    if(result!=null){
      setModalOpen(true)
    };
  }



  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Modal */}
      <Modal id="modal" ariaLabel="modal-headline" show={modalOpen} handleClose={()=>{
        window.location.href='/signin'}}>
        <div className='p-5'>
          <img className="" src={Welcome}/>
          <p className='text-center'>Sign in with you new account now!</p>
        </div>
      </Modal>
      {/*  Page content */}
      <main className="flex-grow">

        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1"><span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-rose-900">Welcome. </span>Sign up to unlock the best haircut experience.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={(e)=>handleSubmit(e)}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">First Name <span className="text-red-600">*</span></label>
                      <input id="firstName" type="text" className="form-input w-full text-gray-800" placeholder="Enter your first name" onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Last Name <span className="text-red-600">*</span></label>
                      <input id="lastNname" type="text" className="form-input w-full text-gray-800" placeholder="Enter your last name" onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                      <input id="email" type="email" className="form-input w-full text-gray-800" placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Phone <span className="text-red-600">*</span></label>
                      <input id="phone" type="text" className="form-input w-full text-gray-800" placeholder="Enter your phone Number" onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                      <input id="password" type="password" className="form-input w-full text-gray-800" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-rose-700 hover:bg-rose-800 w-full">Sign up</button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-600 text-center mt-6">
                  Already have account? <Link to="/signin" className="text-rose-600 hover:underline transition duration-150 ease-in-out">Sign in</Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default CustomerSignUpForm;