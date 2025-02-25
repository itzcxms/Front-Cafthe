import React from 'react';
import ProductList from "./ProductList";
import '../styles/Home.css';
import {Link} from "react-router-dom";

function Home(props) {
    return (
        <div className={"containerHome"}>
            {/* BENTO */}
            <div className="bento-box">
                <div className="bento-child one">
                    <img src="./assets/images/bento-1.png" alt=""/>
                </div>
                <div className="bento-child two">
                    <img src="./assets/images/bento-2.png" alt=""/>
                </div>
                <div className="bento-child three">
                    <img src="./assets/images/bento-3.png" alt=""/>
                </div>
                <div className="bento-child four">
                    <img src="./assets/images/bento-4.jpg" alt=""/>
                </div>
            </div>

            <h2>Nos best-sellers</h2>
            <ProductList api={"http://localhost:3000/api/home-best-sellers"} voirPlus={"/cafes"}/>

            <h2>Naviguer par catégorie</h2>
            <div className="categoriesImages">
                <div className="categoriesColonnes">
                    <Link to={`/cafes`}>
                        <img src="./assets/images/nos-cafes.jpg" alt=""/>
                    </Link>

                    <Link to={`/thes`}>
                        <img src="./assets/images/nos-thes.jpg" alt=""/>
                    </Link>

                    <Link to={`/infusions`}>
                        <img src="./assets/images/nos-infusions.jpg" alt=""/>
                    </Link>

                    <Link to={`/accessoires`}>
                        <img src="./assets/images/nos-accessoires.jpg" alt=""/>
                    </Link>
                </div>
            </div>
            <h2>Titre</h2>
        </div>
    );
}

export default Home;