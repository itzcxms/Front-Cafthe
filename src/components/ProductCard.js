import React from 'react';
import {Link} from "react-router-dom";

function ProductCard({produit}) {
    return (
        <Link to={`/produit/${produit.id}`} className="details-btn">
            <div className="productCard">
                <img src={`/assets/images/${produit.image}`} alt={produit.nom}/>
            </div>
        </Link>
    );
}

export default ProductCard;

{/*
<div className="product-card">
            }
<h3>{produit.nom}</h3>
<p>{produit.prix}</p>
<Link to={`/produit/${produit.id}`} className="details-btn">
    Voir détails
</Link>
</div>
*/}