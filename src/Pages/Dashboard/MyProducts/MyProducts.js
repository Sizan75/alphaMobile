import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading'

const MyProducts = () => {
    const { user } = useContext(AuthContext)
    const [deletingProduct, setDeletingProduct]= useState(null)

    const closeModal = () =>{
        setDeletingProduct(null)
    }   
    const url = `https://alpha-mobile-server.vercel.app/myproducts?email=${user?.email}`
    const { data: myproducts = [], refetch, isLoading } = useQuery({
        queryKey: ['myproducts', user?.email],
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

    const handleProductDelete = product =>{
        fetch(`https://alpha-mobile-server.vercel.app/myproducts/${product._id}`,{
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=> res.json())
        .then(data=>{
            if(data.deletedCount >0){
                refetch()
            toast.success(`Product ${product.productName} deleted Successfully`)
            }

        })
        }
   

    const advertiseProduct = id =>{
        fetch(`https://alpha-mobile-server.vercel.app/myproducts/${id}`,{
                method:"PUT"
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.modifiedCount > 0){
                    toast.success('Advertized added successfully')
                    refetch()
                }
            })
        
    }
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <h3 className='text-3xl mb-5'>My Products</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Location</th>
                            <th>Condition</th>
                            <th>Action</th>
                            <th>Advertize Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myproducts.map((product, i) => <tr key={product._id} className="hover">
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-24 rounded-xl">
                                            <img src={product.image} alt="" />
                                        </div>
                                    </div>
                                </td>

                                <td>{product.productName}</td>
                                <td>{product.sellingPrice}</td>
                                <td>{product.location}</td>
                                <td>{product.condition}</td>
                                <td>
                                <label onClick={()=> setDeletingProduct(product)} htmlFor="confirmation-modal" className="btn btn-sm btn-error text-white">Delete</label>
                                </td>
                                <td>
                     {
                        product?.advertiseStatus !== 'advertised' ?
                            <button onClick={() => advertiseProduct(product._id)} className='bg-blue-600 btn btn-sm'>Advetize</button>
                            :
                            <button className='btn btn-xs bg-green-600 border-0'>Advertized</button>
                    }
                        </td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                deletingProduct && 
                <ConfirmationModal
                title={'Are you sure you want to delete'}
                message={`If you delete ${ deletingProduct.productName} can not be undone`}
                closeModal= {closeModal}
                successAction= {handleProductDelete}
                successButton={'Delete'}
                modalData= {deletingProduct}
                >

                </ConfirmationModal>
            }
        </div>
    );
};

export default MyProducts;