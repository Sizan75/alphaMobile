import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AdvertizedProductCard from './AdvertizedProductCard';

const AdvertizedProduct = () => {
    const url= `https://alpha-mobile-server.vercel.app/advertise?advertiseStatus=advertised`
    const { data: advertises = [], refetch,isLoading } = useQuery({
        queryKey: ['advertises', "advertiseStatus"],
        queryFn: async () => {
            const res = await fetch(url)
            const data = await res.json()
            return data
        }
    })
    return (
        <div>
           {  advertises.length > 0 &&
           <>  
           <h2 className='text-2xl text-green-600 font-bold'>Advertised Product</h2>
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5'>
          {
            advertises.map(advertise =><AdvertizedProductCard
            key={advertise._id}
            advertise={advertise}
            ></AdvertizedProductCard>)
          }
        </div>
    </>
        }
        </div>
    );
};

export default AdvertizedProduct;