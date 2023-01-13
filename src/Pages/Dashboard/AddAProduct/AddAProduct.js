import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const AddAProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey= process.env.REACT_APP_img_key
    const navigate= useNavigate()
   const {user}= useContext(AuthContext)

    const handleAddAProduct = (data) => {
       const image= data.img[0]
       const categoryName=data.brand === "01" ? 'IPhone' : data.brand === "02" ? 'Samsung' : 'Mi';
       const current = new Date();
       let day=current.getDate()
       let month=current.getMonth()
       let currentYear=current.getFullYear()
       let currentDate= `${day}-${month}-${currentYear}`
       const time = current.toLocaleTimeString("en-US");

       const formData= new FormData();
       formData.append('image', image);
       const url= `https://api.imgbb.com/1/upload?&key=${imageHostKey}`
        fetch(url,{
            method:"POST",
            body:formData
        })
        .then(res=> res.json())
        .then(imgData=>{
            if(imgData.success){
            console.log(imgData.data.url)
            const product= {
                productName: data.productName,
                buyingPrice: data.buyingPrice,
                phone: data.phone,
                image: imgData.data.url,
                yearOfUse:data.year,
                sellingPrice:data.sellingPrice,
                details:data.details,
                location:data.location,
                condition:data.condition,
                categoryId:data.brand,
                categoryName:categoryName,
                postTime: time,
                postDate: currentDate,
                sellerName: user.displayName,
                email: user.email

            }
            fetch('https://alpha-mobile-server.vercel.app/products',{
                method: "POST",
                headers:{
                    'content-type': 'application/json',
                    // authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(product)
            })
            .then(res=>res.json())
            .then(result=>{
                console.log(result)
                toast.success(`${data.productName} is added successfully`)
                navigate('/')
            })
            }
        })
    }
    // if (isLoading) {
    //     return <Loading></Loading>
    // }
    return (
        <div className=' p-7 '>
        <h2 className='text-4xl'>Add a Product</h2>
        <form className=' mt-5 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 px-8 gap-5' onSubmit={handleSubmit(handleAddAProduct)}>
            <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Product Name</span></label>
                <input type="text" {...register("productName", {
                    required: "Product Name is Required"
                })} className="input input-bordered input-success w-full max-w-xs" />
                {errors.productName && <p className='text-red-500'>{errors.productName.message}</p>}
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Buying Price</span></label>
                <input type="text" {...register("buyingPrice", {
                    required: true
                })} className="input input-bordered input-success w-full max-w-xs" />
                {errors.buyingPrice && <p className='text-red-500'>{errors.buyingPrice.message}</p>}
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Phone Number</span></label>
                <input type="text" {...register("phone", {
                    required: true
                })} className="input input-bordered input-success w-full max-w-xs" />
                {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Year of Use</span></label>
                <input type="text" {...register("year", {
                    required: true
                })} className="input input-bordered input-success w-full max-w-xs" />
                {errors.year && <p className='text-red-500'>{errors.year.message}</p>}
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Selling Price</span></label>
                <input type="text" {...register("sellingPrice", {
                    required: true
                })} className="input input-bordered input-success w-full max-w-xs" />
                {errors.sellingPrice && <p className='text-red-500'>{errors.sellingPrice.message}</p>}
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Details</span></label>
                <textarea {...register("details", {
                    required: true
                })} className="textarea textarea-success" placeholder=""></textarea>
                {errors.details && <p className='text-red-500'>{errors.details.message}</p>}
            </div>
            <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Location</span></label>
                        
                        <select
                        {...register("location", {
                            required: "Location is Required"
                        })} 
                        className="select select-success w-full max-w-xs">
                            <option value="Dhaka">Dhaka</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Shylet">Shylet</option>
                            <option value="Chittagong">Chittagong</option>
                        </select>
                        {errors.location && <p className='text-red-500'>{errors.location.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Condition</span></label>
                        
                        <select
                        {...register("condition", {
                            required: "condition is Required"
                        })} 
                        className="select select-success w-full max-w-xs">
                            <option value="Fair">Fair</option>
                            <option value="Good">Good</option>
                            <option value="Excellent">Excellent</option>
                        </select>
                        {errors.condition && <p className='text-red-500'>{errors.condition.message}</p>}
                    </div>
            <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Image</span></label>
                <input type="file" {...register("img", {
                    required: "Img is Required"
                })} className="file-input file-input-bordered file-input-success w-full max-w-xs" />
                {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
            </div>
            <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Brand</span></label>
                        <select
                        {...register("brand", {
                            required: "Brand is Required"
                        })} 
                        className="select select-success w-full max-w-xs">
                            <option value="01">IPhone</option>
                            <option value="02">Samsung</option>
                            <option value="03">Mi</option>
                        </select>
                        {errors.condition && <p className='text-red-500'>{errors.condition.message}</p>}
                    </div>
                   
            <input className='btn btn-success  w-full mt-4' value="Add Product" type="submit" />
          
        </form>


    </div>
    );
};

export default AddAProduct;