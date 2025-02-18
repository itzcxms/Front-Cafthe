import React from 'react';
import ProductList from "./ProductList";
import '../styles/Home.css';

function Home(props) {
    return (
        <div className={"containerHome"}>
            <h2>Nos best-sellers</h2>
            <ProductList api={"http://localhost:3000/api/home-best-sellers"} voirPlus={"/cafes"}/>

            <h2>Naviguer par catégorie</h2>
            <div className="categoriesImages">
                <div className="categoriesColonnes">
                    <img src="./assets/images/nos-cafes.jpg" alt=""/>
                    <img src="./assets/images/nos-thes.jpg" alt=""/>
                    <img src="./assets/images/nos-cafes.jpg" alt=""/>
                    <img src="./assets/images/nos-thes.jpg" alt=""/>
                </div>
            </div>

            <h2>Titre</h2>


        </div>
    );
}

export default Home;