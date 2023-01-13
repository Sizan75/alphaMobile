
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';

const BookingModal = ({ setProductBooking, productBooking }) => {
  
  const {productName, sellingPrice, _id,image, buyingPrice,
      sellerName, email}= productBooking;
    
    const { user } = useContext(AuthContext);

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const meetlocation = form.meetlocation.value;
        const name = form.name.value;
        const userEmail = form.email.value;
        const phone = form.phone.value;
       
        const booking = {
            productName:productName,
            productId:_id,
            buyerName: name,
            meetlocation: meetlocation,
            userEmail,
            userPhone: phone,
            sellingPrice: sellingPrice,
            BuyingPrice: buyingPrice,
            image,
            sellerEmail: email,
            sellerName
        }
       
        fetch('https://alpha-mobile-server.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setProductBooking(null);
                    toast.success('Booking confirmed');
                    // refetch()
                }
                else{
                    toast.error(data.message);
                }
            })

            fetch(`https://alpha-mobile-server.vercel.app/bookedProducts/${_id}`,{
            method:"PUT",
            headers:{
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount > 0){
                toast.success('User admin added successfully')
                // refetch()
            }
        })


    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Booking For: {productName}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>

                        <input type="text"  defaultValue={sellingPrice} disabled className="input w-full input-bordered " />
                        
                        <input name="name" type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered" />
                        <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered" />
                        <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" />
                        <input name="meetlocation" type="text" placeholder="Meet Up Location" className="input w-full input-bordered" />
                        <br />
                        <input className='btn btn-success w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;