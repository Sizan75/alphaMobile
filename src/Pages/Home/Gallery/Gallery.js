import React from 'react';
import phone1 from '../../../assets/1.jfif'
import phone2 from '../../../assets/2.jfif'
import phone3 from '../../../assets/3.webp'
import phone4 from '../../../assets/4.webp'
import phone5 from '../../../assets/samsungs22.jfif'

const Gallery = () => {
    return (
        <div>
            <h2 className='text-2xl text-green-600 mt-20 mb-20 font-bold'>Gallery</h2>
            <section className="py-6 dark:bg-gray-800 dark:text-gray-50">
                <div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">
                    <img src={phone2} alt="" className="w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-3 md:row-start-1 dark:bg-gray-500 aspect-square" />
                    <img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={phone1} />
                    <img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={phone3} />
                    <img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={phone4} />
                    <img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={phone5} />

                </div>
            </section>
        </div>
    );
};

export default Gallery;