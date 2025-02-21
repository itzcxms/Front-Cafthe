import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import "../styles/PageProduit.css";
import ProductList from "./ProductList";

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
            <div className="containerPageProduit">
                <div className="produit">
                    <div className="imgProduit">
                        <img src={`/assets/images/${produit.image}`} alt={produit.nom}/>
                    </div>
                    <div className="detailsProduit">
                        <h3 className="nomProduit">
                            {produit.nom}
                        </h3>
                        {/* etoiles avis */}
                        <span className="prixProduit">
                        12,49€
                        </span>
                        <span className="prixKilo">

                        </span>
                        <p className="descProduit">
                            {produit.desc_longue}
                        </p>
                        {/*Menu déroulant poids*/}
                        {/*Qte*/}
                        <div className="btn-primary ajouterAuPanier">
                            Ajouter au panier
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="caracteristiquesProduit">
                    <div className="caracteristique">
                        <img src="/assets/images/ICON-ORIGINE.png" alt=""/>
                        <div>
                            <span className={"nomCaracteristique"}>Pays d'origine</span>
                            <span>{produit.pays_origine}</span>
                        </div>
                    </div>
                    <div className="caracteristique">
                        <img src="/assets/images/ICON-REGION.png" alt=""/>
                        <div>
                            <span className={"nomCaracteristique"}>Région</span>
                            <span>{produit.region}</span>
                        </div>
                    </div>
                    <div className="caracteristique">
                        <img src="/assets/images/ICON-ALTITUDE.png" alt=""/>
                        <div>
                            <span className={"nomCaracteristique"}>Altitude</span>
                            <span>{produit.altitude}</span>
                        </div>
                    </div>
                    <div className="caracteristique">
                        <img src="/assets/images/ICON-VARIETE.png" alt=""/>
                        <div>
                            <span className={"nomCaracteristique"}>Variété</span>
                            <span>{produit.variete}</span>
                        </div>
                    </div>
                </div>

                <h2>Vous aimerez aussi...</h2>
                <ProductList api={"http://localhost:3000/api/home-best-sellers"} voirPlus={"/cafes"}/>

            </div>
        </div>
    );
}

export default ProductDetails;