import React from 'react';
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Newsletter from "../components/Newsletter";

function Layout(props) {
    return (
        <>
            <Header />
            <Navbar />
            <Outlet />
            <Newsletter />
            <Footer />
        </>
    );
}

export default Layout;