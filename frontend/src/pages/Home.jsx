import React from 'react';
import Header from '../partials/Header';
import Testimonials from '../partials/Testimonials';
import Newsletter from '../partials/Newsletter';
import Footer from '../partials/Footer';
import Banner from '../partials/Banner';
import VideoHome from '../partials/VideoHome';
import StylistSection from "../partials/StylistSection";

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <VideoHome />
        {/* <FeaturesHome /> */}
        {/* Section header */}
        <StylistSection />
        <Testimonials />
        <Newsletter />

      </main>

      {/* <Banner /> */}

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Home;