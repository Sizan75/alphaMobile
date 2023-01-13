import React from 'react';

const AdvertizedProductCard = ({advertise}) => {
    const {image,productName,sellerName,sellingPrice}= advertise
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={image} alt="advertise" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{productName}</h2>
    <p>Price: {sellingPrice}</p>
    <p>Seller: {sellerName}</p>
    
  </div>
</div>  
        </div>
    );
};

export default AdvertizedProductCard;