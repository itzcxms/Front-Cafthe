import React from 'react';
import {Link} from "react-router-dom";

function ProductCard({produit}) {
    return (
        <div className="product-card">
            { /* image */ }
            <h3>{produit.nom}</h3>
            <p>{produit.prix}</p>
            <Link to={`/produit/${produit.id}`} className="details-btn">
                Voir détails
            </Link>
        </div>
    );
}

export default ProductCard;