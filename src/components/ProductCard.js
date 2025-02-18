import React from 'react';
import {Link} from "react-router-dom";
import "../styles/ProductCard.css";

function ProductCard({produit}) {
    return (
        <Link to={`/produit/${produit.id}`} className="productCard">
            <img src={`/assets/images/${produit.image}`} alt={produit.nom}/>
            <span className="nomProduit">{produit.nom}</span>

            <div>
                <span className="descCourte">{produit.desc_courte}</span>
                {/* TODO Variantes */}
                <span className="variantes">250g, 500g ou 1kg</span>
            </div>

            {/* TODO Prix */}
            <span className="prixProduit">à partir de 12,90€</span>
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