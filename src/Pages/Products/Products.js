import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import ProductCard from './ProductCard';

const Products = () => {
    const products= useLoaderData()
    const [productBooking, setProductBooking] = useState(null)

  
   
    return (
        <div>
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 ml-5'>
            {
                products?.map(mobileProduct =><ProductCard
                key={mobileProduct._id}
                mobileProduct={mobileProduct}
                setProductBooking={setProductBooking}
                >

                </ProductCard>)
            }
        </div>
      {
        productBooking && <BookingModal
        productBooking={productBooking}
        setProductBooking={setProductBooking}
        ></BookingModal>
      }
        </div>
    );
};

export default Products;