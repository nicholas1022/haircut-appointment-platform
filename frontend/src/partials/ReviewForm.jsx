import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import http from "../api/http-common.js";
import { Formik, Form, useField, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

export default function ReviewForm({booking}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
      
    return (
      <div>
        <button className="btn text-white bg-rose-700 hover:bg-rose-800 w-full my-4 sm:w-auto sm:mb-0" onClick={handleOpen}>Review</button>
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
                <div className="flex flex-col max-w-sm mx-auto gap-6 items-center md:max-w-2xl lg:max-w-none">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Leave a review
                    </Typography>
                    <Formik
                        initialValues={{
                        comment: '',
                        serviceType: booking.serviceType,
                        customerId: booking.customerId,
                        stylistId: booking.stylistId,
                        rating: 1
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
                            ),
                            // .required('Required'),                   
                        rating: Yup.number()
                            .min(1, 'Must NOT be less than 1.')
                            .max(5, 'Must NOT be greater than 5.')
                        })}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            // console.log("booking: " + JSON.stringify(booking));
                            // console.log(`Submitting...${JSON.stringify(values)}`);                         
                            // console.log(`After adding customer id...${JSON.stringify(values)}`);
                            http.post('/review', values)
                            .then((response) => {
                                console.log('API Response:', response.data);
                                const updatedBooking = {
                                    ...booking,
                                    reviewId: response.data._id
                                }
                                console.log(JSON.stringify(updatedBooking));
                                http.put(`/booking/${booking._id}`, updatedBooking).then((response) => {
                                    console.log('API Response:', response.data);
                                }).catch((error) => {
                                    // Handle API error
                                    console.error('API Error:', error);
                                })
                                // handleClose();
                                window.location.reload(false);
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
                            <Form>
                                <MyInput label="Rating (1 - 5)" className="w-1/5" name="rating" type="number" />
                                <MyTextArea
                                    label="Comment"
                                    rows = {5}    
                                    cols = {50}    // Specifies the width of the textarea in characters
                                    value={Formik.comment}   // Specifies the initial value of the textarea
                                    wrap = "soft"   // Specifies how the text in the textarea should be wrapped
                                    name = "comment"   // Specifies the name of the textarea, which can be used when submitting a form
                                    minLength = {5}   // Specifies the minimum number of characters required in the textarea
                                    maxLength = {200}   // Specifies the maximum number of characters allowed in the textarea                
                                />
                                
                            </Form>
                        )}
                    </Formik>
                </div>
              </div>
            </section>
          </Box>
        </Modal>
      </div>
    );
}