import React, { useState, useRef, useEffect } from 'react';
import Modal from '../utils/Modal';

import HeroImage from '../images/hero-image.png';
import BarberPoster from '../images/barber-poster.png';

function VideoHome() {
  return (
    <section className="relative">


      <div className="max-w-6xl mx-auto px-4 sm:px-6 my-auto h-screen md:text-end text-center">

        <video autoPlay loop muted id='bg-video' className="">
            <source src="/videos/bg-video.mp4" type='video/mp4'></source>
        </video>
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20 md:w-3/5 xl:w-2/5 w-full py-0 md:float-right" >
          {/* Section header */}
          <div className=" pb-12 md:pb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tighter tracking-tighter mt-4 mb-4" data-aos="zoom-y-out">
              Book with a Specific Stylist
            </h1>
            <div className="max-w-3xl sm:float-right">
              <p className="text-xl text-white mb-8" data-aos="zoom-y-out" data-aos-delay="150">
                Book a one-on-one styling session with one of our experienced stylists in your local store.
              </p>
              <div className="max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                  <a className="btn text-white bg-rose-700 hover:bg-rose-800 mb-4 w-auto sm:mb-0" href="/signin">
                   Make an appointment
                  </a>
                </div>
                <div>
                  <a className="btn text-white bg-gray-900 hover:bg-gray-800 w-auto sm:ml-4" href="#stylists">
                    Explore more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoHome;
