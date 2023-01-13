import React from 'react';
import AddAProduct from './AddAProduct/AddAProduct';
import AllBuyers from './AllBuyers/AllBuyers';
import AllSellers from './AllSellers/AllSellers';
import MyProducts from './MyProducts/MyProducts';

const Dashboard = () => {
    return (
        <div>
            <AddAProduct></AddAProduct>
            <MyProducts></MyProducts>
            <AllSellers></AllSellers>
            <AllBuyers></AllBuyers>
        </div>
    );
};

export default Dashboard;