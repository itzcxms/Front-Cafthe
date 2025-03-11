import React, {useEffect, useState} from 'react';
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/AllProducts.css";
import {parse} from "@fortawesome/fontawesome-svg-core";

function AllProducts(props) {
    const [produits, setProduits] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryChange = (event) => {
        let { value , checked } = event.target;
        value = parseInt(value);

        if (checked) {
            setSelectedCategories([...selectedCategories, value]);
        }
        else {
            setSelectedCategories(selectedCategories.filter((category) => category !== value));
        }
    };

    const filteredProducts = produits.filter((produit) => {
        if (selectedCategories.length === 0) {
            return true;
        }
        console.log(produit.categorie_id);
        return selectedCategories.includes(produit.categorie_id);
    })

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/produits`);
                setProduits(response.data)
            } catch(error) {
                console.error("Erreur de chargement des produits ", error);
            }
        };

        void fetchProduits();
    }, []);



    return (
        <div className={"containerAllProducts"}>
            <div className="barreFiltres">

                <div className="filter-category">
                    <div className="filter-title">
                    Catégorie
                        <span>&#9650;</span>
                    </div>
                    <ul className="filter-options">
                        <li>
                            <label>
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="1"
                                    onChange={handleCategoryChange}
                                />
                                Café
                            </label>
                        </li>

                        <li><label><input type="checkbox" name="category" value="the"/> Thé</label></li>
                        <li><label><input type="checkbox" name="category" value="infusions"/> Infusions</label></li>
                        <li><label><input type="checkbox" name="category" value="accessoires"/> Accessoires</label></li>
                    </ul>
                </div>
            </div>

            <div className="product-list">
                {filteredProducts.map((produit) => (
                    <ProductCard key={produit.id} produit={produit}/>
                ))}
            </div>
        </div>
    );
}

export default AllProducts;