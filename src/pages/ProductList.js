import React, {useEffect, useState} from 'react';
import axios from "axios";

function ProductList(props) {
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api-cafthe");
                setProduits(response.data);
            } catch(error) {
                console.error("Erreur de chargement des produits ", error);
            }
        };

        void fetchProduits();
    }, []);
    return (
        <div>
            <h3>Liste des produits</h3>
        </div>
    );
}

export default ProductList;