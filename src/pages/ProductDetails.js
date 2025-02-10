import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

function ProductDetails(props) {
    const { id } = useParams();
    const [produit, setProduit] = useState([]);

    useEffect(() => {
        const fetchProduit = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/produits/${id}`);
                setProduit(response.data);
            } catch(error) {
                console.error("Erreur de chargement des produits ", error);
            }
        };

        void fetchProduit();
    }, [id]);


    return (
        <div>
            <h3>Détail des produits</h3>
            <div className="product-list">
                <p>{produit.nom}</p>
                <p>{produit.description}</p>
                <p>{produit.prix}</p>
                <p>{produit.stock}</p>
                <p>{produit.image}</p>
            </div>
        </div>
    );
}

export default ProductDetails;