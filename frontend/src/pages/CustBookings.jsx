import React, {Fragment, useEffect, useState} from 'react'
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import BookingBlocks from "../partials/BookingBlocks";
import {getByCust} from "../network/bookingCrud";

export default function CustBookings() {
  const [custBookings, setCustBookings] = useState([]);

  useEffect(() => {
    getByCust().then((res) => {
      // console.log("Bookings: " + JSON.stringify(res.data));
      setCustBookings(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <div className="bg-white">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 h2 mb-4">Booking Records</h1>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
          {custBookings && custBookings.length > 0 ?
            <div className="grid gap-x-8 gap-y-10 grid-cols-4">              
                <div className="lg:col-span-4">{<BookingBlocks bookings={custBookings}/>}</div>
            </div> :
            <span className="flex justify-center items-center text-xl text-center text-gray-500">No Record</span>
          }  
          </section>
        </main>
    </div>
      <Footer />
    </div>
  )
}
