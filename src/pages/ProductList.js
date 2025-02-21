import React, {useEffect, useState} from 'react';
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {Link} from "react-router-dom";
import "../styles/ProductList.css";

function ProductList({api, voirPlus}) {
    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get(api);
                setProduits(response.data);
            } catch(error) {
                console.error("Erreur de chargement des produits ", error);
            } finally {
                setIsLoading(false); // on arrete d'afficher le chargement (squelette)
            }
        };

        void fetchProduits();
    }, []);

    { /* SQUELETTE */ }
    if (isLoading) {
        return (
            <div className="product-list">
                {Array.from({length : 6}).map((_, i) => (
                    <div key={i} className={"product-skeleton"}>
                        {/* Image */}
                        <Skeleton height={200} width={300} />

                        <div style={{marginTop: "10px" }}>
                            <Skeleton height={20} width="70%" />
                        </div>

                        <div style={{marginTop: "10px" }}>
                            <Skeleton height={20} width="40%" />
                        </div>


                    </div>
                ))}
            </div>
        )
    }

    return (
        <div>
            <div className="product-list">
                {produits.map((produit) => (
                    <ProductCard key={produit.id} produit={produit} />
                ))}
            </div>

            {/* Bouton TOUT VOIR */}
            <Link to={voirPlus}><div className="btn-primary">Voir plus</div></Link>

        </div>
    );
}

export default ProductList;