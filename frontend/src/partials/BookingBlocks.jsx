import React, { useState } from 'react';
import {serviceTypeParser} from '../utils/EnumLabel';
import ReviewForm from './ReviewForm';
import star from '../images/rate-star.svg';
import { format } from 'date-fns';

function StylistBlocks({bookings}) {

  return (
    <section className="relative">

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Items */}
        <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
          {bookings.map((booking, index) => (
            <div key={index} className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">{booking.stylist && (`${booking.stylist.firstName} ${booking.stylist.lastName}`)}</h4>
              <p className="text-gray-600 text-center">{format(booking._doc.startAt, 'MMMM do yyyy h:mm')} - {format(booking._doc.endAt, 'h:mm')}</p>
              <p className="mt-1 text-gray-500 text-center">
                {serviceTypeParser(booking._doc.serviceType)}
              </p>
              <div >
                {booking.review ? 
                  <div className='flex flex-col items-center'>
                    <div className='flex flex-row'> <span className='pr-1'>{booking.review.rating} </span> <img width={20} height={20} alt='Large Pizza' src={star} /> </div>  <span> {booking.review.comment} </span>
                  </div> :
                  <ReviewForm booking={booking._doc} />
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StylistBlocks;
