import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import useToken from '../../hooks/useToken';
const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signUpError, setSignUPError] = useState('')
    const { createUser, updateUser,singInGoogle } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider()
    const [createdUserEmail, setCreatedUserEmail]= useState('')
    const [token]= useToken(createdUserEmail)
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    if(token){
        navigate('/')
    }
    const handleSignUp = (data) => {
        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('User Created Successfully.')
                
                const userInfo = {
                    displayName: data.name,
                    photoURL: data.photoURL,
                    email: data.email,
                    rolle: data.role
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.photoURL,data.email ,data.role)              
                     
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });
    }

    const saveUser = (name,photoURL, email,role) =>{
       
        const user= {  displayName: name,
            photoURL: photoURL,
            email:email,
            role: role}
        fetch('https://alpha-mobile-server.vercel.app/users', {
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
        .then(data=>{
            setCreatedUserEmail(email)
           
            
        })
    }

    const handleGoogleSignIn = () => {
        const role="buyer" 
        singInGoogle(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user)
                saveUser(user.displayName,user.photoURL, user.email, role)
                
            })
            .catch(error => console.error(error))
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered input-success w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Image</span></label>
                        <input type="text" {...register("photoURL", {
                            required: "Photo is Required"
                        })} className="input input-bordered input-success w-full max-w-xs" />
                        {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: true
                        })} className="input input-bordered input-success w-full max-w-xs" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters long" },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })} className="input input-bordered input-success w-full max-w-xs" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Role</span></label>
                        
                        <select
                        {...register("role", {
                            required: "role is Required"
                        })} 
                        className="select select-success w-full max-w-xs">
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                        {errors.role && <p className='text-red-500'>{errors.role.message}</p>}
                    </div>
                    <input className='btn btn-success w-full mt-4' value="Sign Up" type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account <Link className='text-secondary' to="/login">Please Login</Link></p>
                <div className="divider">OR</div>
                <button  onClick={handleGoogleSignIn} className="btn btn-outline btn-success w-full mt-1 text-dark"><FcGoogle></FcGoogle>  Google Sign In</button>

            </div>
        </div>
    );
};

export default SignUp;