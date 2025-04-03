import React from 'react';
import ProductList from "./ProductList";
import '../styles/Home.css';
import { Link } from "react-router-dom";

const CATEGORIES = [
    { path: '/cafes', image: './assets/images/nos-cafes.jpg', alt: 'Nos cafés' },
    { path: '/thes', image: './assets/images/nos-thes.jpg', alt: 'Nos thés' },
    { path: '/infusions', image: './assets/images/nos-infusions.jpg', alt: 'Nos infusions' },
    { path: '/accessoires', image: './assets/images/nos-accessoires.jpg', alt: 'Nos accessoires' }
];

const BENTO_IMAGES = [
    { src: './assets/images/bento-1.png', alt: 'Présentation produit 1', className: 'one' },
    { src: './assets/images/bento-2.png', alt: 'Présentation produit 2', className: 'two' },
    { src: './assets/images/bento-3.png', alt: 'Présentation produit 3', className: 'three' },
    { src: './assets/images/bento-4.jpg', alt: 'Présentation produit 4', className: 'four' }
];

function Home() {
    return (
        <div className="container-home">
            <div className="inner-container-home">
                {/* Bento Box Header */}
                <section className="section-bento">
                    <div className="bento-box">
                        {BENTO_IMAGES.map((image, index) => (
                            <div key={index} className={`bento-child ${image.className}`}>
                                <img src={image.src} alt={image.alt}/>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="section-bestsellers">
                    <h2>Nos best-sellers</h2>
                    <ProductList api={`${process.env.REACT_APP_API_URL}/api/home-best-sellers`} voirPlus={"/produits"}/>
                </section>

                <section className="section-categories">
                    <h2>Naviguer par catégorie</h2>
                    <div className="categories-grid">
                        {CATEGORIES.map((category, index) => (
                            <Link key={index} to={category.path} className="category-item">
                                <img src={category.image} alt={category.alt}/>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="section-bestsellers">
                    <h2>Les cafés</h2>
                    <ProductList api={`${process.env.REACT_APP_API_URL}/api/home-best-sellers`} voirPlus={"/produits"}/>
                </section>

                <section className="section-bestsellers">
                    <h2>Les thés</h2>
                    <ProductList api={`${process.env.REACT_APP_API_URL}/api/home-best-sellers`} voirPlus={"/produits"}/>
                </section>

            </div>
        </div>
    );
}

export default Home;