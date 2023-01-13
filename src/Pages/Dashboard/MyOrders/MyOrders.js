import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query'

import { AuthContext } from '../../../context/AuthProvider';


import Loading from '../../Shared/Loading/Loading'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const MyOrders = () => {
    const { user } = useContext(AuthContext)
    // const [deletingProduct, setDeletingProduct]= useState(null)


    const url = `https://alpha-mobile-server.vercel.app/myorders?email=${user?.email}`
    const { data: myorders = [], refetch, isLoading } = useQuery({
        queryKey: ['myorders', user?.email],
        queryFn: async () => {
            const res = await fetch(url)
            const data = await res.json()
            return data
        }
    })





    if (isLoading) {
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
                            <th>Product Name</th>
                            <th>Buying Price</th>

                            <th>Payment</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            myorders.map((order, i) => <tr key={order._id} className="hover">
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-24 rounded-xl">
                                            <img src={order.image} alt="" />
                                        </div>
                                    </div>
                                </td>

                                <td>{order.productName}</td>
                                <td>{order.sellingPrice}</td>
                                <td>
                                    {
                                        order.sellingPrice && !order.paid && <Link
                                            to={`/dashboard/payment/${order._id}`}
                                        >
                                            <button
                                                className='btn btn-primary btn-sm'
                                            >Pay</button>
                                        </Link>
                                    }
                                    {
                                        order?.sellingPrice && order.paid && <span className='text-green-500'>Paid</span>
                                    }
                                </td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;