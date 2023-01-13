import { useQuery } from '@tanstack/react-query';
import React, {  useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const AllBuyers = () => {
    
    const [deletingBuyers, setdeletingBuyers]= useState(null)

    const closeModal = () =>{
        setdeletingBuyers(null)
    }   
    const url = `https://alpha-mobile-server.vercel.app/users?role=buyer`
    const { data: allBuyers = [], refetch,isLoading } = useQuery({
        queryKey: ['allBuyers', "buyer"],
        queryFn: async () => {
            const res = await fetch(url,{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data
        }
    })

    const handleBuyerDelete = buyer =>{
        fetch(`https://alpha-mobile-server.vercel.app/users/${buyer._id}`,{
            method: 'DELETE',
            // headers:{
            //   authorization: `bearer ${localStorage.getItem('accessToken')}`
            //     }
        })
        .then(res=> res.json())
        .then(data=>{
            if(data.deletedCount >0){
                refetch()
            toast.success(`buyer ${buyer?.displayName} deleted Successfully`)
            }

        })
        }
    // if(isLoading){
    //     return <Loading></Loading>
    // }
    return (
        <div>
        <h3 className='text-3xl mb-5'>All Buyers</h3>
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        
                        <th>Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        allBuyers.map((buyer, i) => <tr key={buyer._id} className="hover">
                            <th>{i + 1}</th>
                            <td>
                                <div className="avatar">
                                    <div className="w-24 rounded-xl">
                                        <img src={buyer.photoURL} alt="" />
                                    </div>
                                </div>
                            </td>

                            <td>{buyer.displayName}</td>
                            <td>{buyer.email}</td>
                            
                            <td>
                            <label onClick={()=> setdeletingBuyers(buyer)} htmlFor="confirmation-modal" className="btn btn-sm btn-error text-white">Delete</label>
                               
                                </td>
                            
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
        {
            deletingBuyers && 
            <ConfirmationModal
            title={'Are you sure you want to delete'}
            message={`If you delete ${ deletingBuyers.displayName} can not be undone`}
            closeModal= {closeModal}
            successAction= {handleBuyerDelete}
            successButton={'Delete'}
            modalData= {deletingBuyers}
            >

            </ConfirmationModal>
        }
    </div>
    );
};

export default AllBuyers;