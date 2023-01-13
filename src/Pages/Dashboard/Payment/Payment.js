import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';


const stripePromise= loadStripe(process.env.REACT_APP_STRIPE_PK)
console.log(stripePromise)
const Payment = () => {
    const booking= useLoaderData()
    console.log(booking)
    const { productName, sellingPrice} = booking;
    return (
        <div>
            <h3 className="text-3xl">Payment for {productName}</h3>
            <p className="text-xl">Please pay <strong>${sellingPrice}</strong> for your appointment. </p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;