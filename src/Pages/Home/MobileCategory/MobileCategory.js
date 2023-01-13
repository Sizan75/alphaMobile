import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

const MobileCategory = () => {
    const {data:mobileCategory=[], isLoading}= useQuery({
        queryKey:['mobileCategory'],
        queryFn: ()=> fetch('https://alpha-mobile-server.vercel.app/category')
        .then(res => res.json())
        
    })
    // if(isLoading){
    //     return <Loading></Loading>
    // }
    return (
        <section className='my-16'>
            <p className='text-center  font-bold text-green-600 text-2xl'>Category of Mobile </p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
                {
                    mobileCategory.map(category=> 
                        <div key={category._id} className='card '>
                        <img src={category.image} className="h-72" alt="" />
                        <h2 className='card-title'>{category.name}</h2>
                        <Link to={`/category/${category.id}`} >
                        <button className='btn btn-success ww-1/2 '>Show All</button>
                        </Link>
                        </div>
                     )
                }
            </div>
        </section>
    );
};

export default MobileCategory;