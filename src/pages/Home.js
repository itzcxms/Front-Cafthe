import React from 'react';
import ProductList from "./ProductList";
import Header from "../components/Header";

function Home(props) {
    return (
        <div>
            <h1>Bienvenue chez Cafthé</h1>
            <Header />
            <ProductList />
        </div>
    );
}

export default Home;