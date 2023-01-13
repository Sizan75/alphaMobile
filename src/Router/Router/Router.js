import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main/Main";
import Blogs from "../../Pages/Blogs/Blogs";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import DisplayError from '../../Pages/Shared/DisplayError/DisplayError'
import Products from "../../Pages/Products/Products";
import DashboardLayout from "../../layouts/DashboardLayout";
import AdminRoute from "../AdminRoute/AdminRoute";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ReportedItems from "../../Pages/Dashboard/ReportedItems/ReportedItems";
import BuyerRoute from "../BuyerRoute/BuyerRoute";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import SellerRoute from "../SellerRoute/SellerRoute";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import AddAProduct from "../../Pages/Dashboard/AddAProduct/AddAProduct";
import Payment from "../../Pages/Dashboard/Payment/Payment";

export const router = createBrowserRouter([

    {
        path:'/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError> ,
        children: [

            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>,
            }
            ,
            {
                path: '/login',
                element: <Login></Login>,
            }
            ,
            {
                path: '/blogs',
                element: <Blogs></Blogs>,
            },
            {
                path:'/category/:id',
                element: <Products></Products>,
                loader: ({params})=> fetch(`https://alpha-mobile-server.vercel.app/category/${params.id}`)
            },
            
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard/allbuyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/allsellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/dashboard/reporteditems',
                element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute>
            },
            {
                path: '/dashboard/myorders',
                element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <BuyerRoute><Payment></Payment></BuyerRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/bookings/${params.id}`)
            },
            {
                path: '/dashboard/myproducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/addaproduct',
                element: <SellerRoute><AddAProduct></AddAProduct></SellerRoute>
            },
            
        ]
    }
])