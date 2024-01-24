import React, { useEffect, useState } from 'react';
import { Formik, Form, useField, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import http from "../api/http-common.js";
import {adjustHours} from "../utils/DateUtil.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const BookingInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div>
        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor={props.id || props.name}>{label}</label>
        <input {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error text-sm font-bold mb-1 text-red-600">{meta.error}</div>
        ) : null}
      </div>
    );
};

const MyTextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div>
        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor={props.id || props.name}>{label}</label>
        <textarea {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error text-sm font-bold mb-1 text-red-600">{meta.error}</div>
        ) : null}
      </div>
    );
  };

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-sm font-bold mb-1 text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};

const Booking = () => {
  const [bookedTimes, setBookedTimes] = useState();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState();
  const [servicePrices, setServicePrices] = useState({});
  const [selectedServiceType, setSelectedServiceType] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let { stylId } = useParams();

  const { currentUser } = useAuth();
  useEffect(() => {
	const startDate = new Date(new Date().setHours(0,0,0,0)).toISOString();
	const current = new Date().setHours(0,0,0,0);
    const endDate = new Date(current);
    endDate.setDate(new Date().getDate() + 7);

	console.log("Param: " + stylId);
	// get prices
	http.get(`/stylist/${stylId}`).then(response => {
		setServicePrices(response.data.serviceTypes);
	}).catch(error => {
		console.error('Error fetching stylist data:', error.ErrorMessage);
	});

	//get available times
	http.get(`/booking/stylist/${stylId}/startTime/${startDate}/endTime/${endDate.toISOString()}`)
		.then(response => {
		  const map = new Map();
		  const adjustedBookings = response.data.map(booking => {
			// console.log(`Adjusted Booking: ${adjustHours(new Date(booking.startAt), -5).toISOString()}`)
			booking.startAt = adjustHours(new Date(booking.startAt), -5).toISOString();
			// console.log(`Booking: ${JSON.stringify(booking)}`);
			return booking;
		  })
		  adjustedBookings.map(booking => {
			// console.log(`Booking: ${JSON.stringify(booking)}`);
			const startDate = booking.startAt.substring(0, 10);
			if (map.get(startDate)) {
				map.set(startDate, [...map.get(startDate), new Date(booking.startAt)]);
			} else {
				map.set(startDate, [new Date(booking.startAt)]);
			}
		  })
			// console.log(map);
			setBookedTimes(map);
		})
		.catch(error => {
		console.error('Error fetching dropdown values:', error);
		});
	}, []); // Run once on component mount
//   const [times, setTimes] = useState([]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleSelectDate = (event) => {
	Formik.date = event.target.value;
	console.log("Today: " + today);
	console.log("Selected booking date: " + event.target.value);
	const duration = [];
	for (let i = 9; i < 18; i++) {
		const temp = new Date(event.target.value);
		// console.log(`Temp date: ` + temp);
		const newDate = new Date(temp.getTime() + (i * 60 * 60 * 1000));
		// console.log(`Temp date(${i}): ` + newDate);
		duration[i-9] = newDate;
	}

	const times = bookedTimes.get(event.target.value);
	console.log("Times: " + times);
	let numericTimes = [];
	if (times) {
		// console.log("Duration: " + duration);
		numericTimes = times.map(date => date.getTime());
	}
	const filteredTimes = duration.filter((time) => 
			!numericTimes.includes(time.getTime())
		);
	// console.log("filteredTimes: " + filteredTimes);
	const filteredTimesRange = filteredTimes.map((time) => {
		const start = new Date(time.getTime() + (5 * 60 * 60 * 1000)).getHours();
		const end = new Date(time.getTime() + (6 * 60 * 60 * 1000)).getHours();
		return `${start}:00 - ${end}:00`;
	})
	setAvailableTimes(filteredTimesRange);
  }

  const handleSerivceTypeChange = (event) => {
	setSelectedPrice(servicePrices.find(serviceType => serviceType.name === event.target.value).price);
  }

  return (
    <>
      <Formik
        initialValues={{
          stylistId: `${stylId}`,
		  serviceType: '',
          startAt: '',
		  date: '',
		  price: selectedPrice
        }}
        validationSchema={Yup.object({
          serviceType: Yup.string()
            .oneOf(
              [			
				'HAIRCUT',
				'HAIR_COLORING',
				'HAIR_STYLING',
				'HAIR_TREATMENT',
				'HAIR_REMOVAL',
				'NAIL',
				'SKIN_CARE',
				'MAKE_UP',
				'OTHERS'
			  ],
              'Invalid Job Type'
            )
            .required('Required'),
		  date: Yup.date()
			.min(today, 'Must not be before today.')
			.max(new Date(today.getTime() + (6 * 24 * 60 * 60 * 1000)), 'Allow for 7 days in advance.')
			.required('Required'),
			price: Yup.number()
			  .min(0, 'Must be greater than zero.')
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
			console.log(`Submitting...${JSON.stringify(values)}`);
			handleOpen();
			// Handle form submission
			values = {
				...values,
				customerId: currentUser.uid,
				startAt: `${values.date}T${values.startAt.substring(0,5)}:00.000-0500`,
				endAt: `${values.date}T${values.startAt.substring(8,13)}:00.000-0500`,
				price: selectedPrice
			}
			console.log(`After adding customer id...${JSON.stringify(values)}`);
			http.post('/booking', values)
			  .then((response) => {
				console.log('API Response:', response.data);
				resetForm(); // Reset the form after successful submission
			  })
			  .catch((error) => {
				// Handle API error
				console.error('API Error:', error);
			  })
			  .finally(() => {
				
				setSubmitting(false); // Reset submitting state
			});
		  }}
		  className="flex flex-col min-h-screen overflow-hidden"
      >
		{({ values, setFieldValue }) => ( 
    <section className="relative">
	
        {/* Hero content */}
        
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-rose-900">Secure your new look</span>
            </h1>
          </div>
		  <div className="flex justify-center items-center pb-20 mb-20">
            <Form className="flex">
			  <div className="-mx-3 mb-4 px-3">
				<div className="w-full px-3">
				  <MySelect label={selectedPrice ? `Service Type (Price: ${selectedPrice})` : `Service Type`} name="serviceType" 
				  	onChange={(event) => {
						setFieldValue('serviceType', event.target.value);
						handleSerivceTypeChange(event);
					}}>
					<option value="">Select a job type</option>
					<option value="HAIRCUT">Haircut</option>
					<option value="HAIR_COLORING">Hair Coloring</option>
					<option value="HAIR_STYLING">Hair Styling</option>
					<option value="HAIR_TREATMENT">Hair Treatment</option>
					<option value="HAIR_REMOVAL">Hair Removal</option>
					<option value="NAIL">Nail Care</option>
					<option value="SKIN_CARE">Skin Care</option>
					<option value="MAKE_UP">Make Up</option>
					<option value="OTHERS">Others</option>
				  </MySelect>
				</div>
			  </div>
			  <div className="-mx-3 mb-4 px-3">
				  <div className="w-full px-3">
					<label className="block text-gray-800 text-sm font-medium mb-1">Date</label>
					  <Field 
						name="date"
						type="date"
						onChange={(event) => {
							setFieldValue('date', event.target.value);
							handleSelectDate(event);
						}}
						value={Formik.date}
					  />		
				  <ErrorMessage name="date" component="div" />
			    </div>
			  </div>

		      <div className="-mx-3 mb-4 px-3">
		        <div className="w-full px-3">
				  <MySelect label="Time" name="startAt">
					<option value="">Select a time</option>
					{availableTimes.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
					))}
			      </MySelect>
		        </div>
		      </div>
		      <div className="-mx-3 mt-6 px-3">
		        <div className="w-full px-3">
                  <button className="btn text-white bg-rose-700 hover:bg-rose-800 w-full mb-4 sm:w-auto sm:mb-0" type="submit">Book</button>
		  	    </div>
			  </div>
            </Form>
		  </div>	
		  </section>
		)}
      </Formik>
	  <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute
                            top-1/2
                            left-1/2
                            -translate-x-1/2
                            -translate-y-1/2
                            w-400
                            bg-white
                            shadow-md
                            p-4">
            <section className="relative">

              <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col max-w-sm mx-auto gap-6 items-center md:max-w-2xl lg:max-w-none px-3">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Booked Successfully
                    </Typography>
                    <button className="btn items-center justify-center text-white bg-rose-700 hover:bg-rose-800 w-1/3 mt-4 " onClick={handleClose} >Close</button>
                </div>
              </div>
            </section>
          </Box>
        </Modal>
		
    </>
  );
};

export default Booking;