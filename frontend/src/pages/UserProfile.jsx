import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import http from "../api/http-common.js";
import Footer from "../partials/Footer.jsx";
import Header from "../partials/Header.jsx";
import UserBlock from '../partials/UserBlock.jsx';

function UserProfile() {



  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      <div className="bg-white">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 h2 mb-4">Profile</h1>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <UserBlock />
          </section>
        </main>
      </div>
        {/*  Page sections */}




      {/* <Banner /> */}

      {/*  Site footer */}
      <Footer />

    </div>
  );


}
export default UserProfile;
