import React, {useEffect, useState, useContext} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import "../styles/PageProduit.css";
import ProductList from "./ProductList";
import {CartContext} from "../context/CartContext";
import { motion } from "framer-motion";

function PageProduit(props) {
    const { id } = useParams();
    const [produit, setProduit] = useState([]);
    const [quantite, setQuantite] = useState(1);
    const { addToCart } = useContext(CartContext);

    {/* Animation */}
    const [animating, setAnimating] = useState(false);
    const [animationKey, setAnimationKey] = useState(0); // Pour relancer l'animation
    const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const fetchProduit = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/produits/${id}`);
                setProduit(response.data);
            } catch(error) {
                console.error("Erreur de chargement des produits ", error);
            }
        };

        void fetchProduit();
        window.scrollTo(0,0);
    }, [id]);

    const [poids, setPoids] = useState([]);

    useEffect(() => {
        const fetchPoids = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/variantes/poids/${id}`);
                console.log(response.data)
                setPoids(response.data);
            } catch(error) {
                console.error("Erreur de chargement des produits ", error);
            }
        };

        void fetchPoids();
    }, [id]);

     const [selectedPoids, setSelectedPoids] = useState([]);
     const [selectedPrix, setSelectedPrix] = useState([]);

     const handlePoidsChange = (event) => {
         const poidsChoisi = event.target.value;
         setSelectedPoids(poidsChoisi);

         const variante = poids.find((item) => item.poids.toString() === poidsChoisi);
         if (variante) {
             setSelectedPrix(variante.prix);
         }
     }

    useEffect(() => {
        if (poids.length > 0) {
            setSelectedPoids(poids[0].poids);
            setSelectedPrix(poids[0].prix);
        }
    }, [poids]); // Exécuté dès que les poids sont chargés

    const augmenterQuantite = () => {
        if (quantite < 99) {
            setQuantite(quantite + 1);
        }
    };

    const diminuerQuantite = () => {
        if (quantite > 1) {
            setQuantite(quantite - 1);
        }
    };

    const handleAddToCart = () => {
        const selectedVariant = poids.find(item => item.poids.toString() === selectedPoids.toString());

        const button = document.getElementById(`add-to-cart-${produit.id}`);
        const panierIcon = document.getElementById("panier-icon");

        if (button && panierIcon) {
            const buttonRect = button.getBoundingClientRect();
            const panierRect = panierIcon.getBoundingClientRect();

            setAnimationPosition({
                x: panierRect.left - buttonRect.left,
                y: panierRect.top - buttonRect.top
            });

            setAnimating(true);
            setAnimationKey(prevKey => prevKey + 1);

            setTimeout(() => setAnimating(false), 800);
        }

        if (selectedVariant && produit.id) {
            addToCart(
                produit,
                selectedVariant,
                quantite
            );
        }
    };

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
                        <div className="prix">
                            <span className="prixProduit">
                                {selectedPrix ? `${selectedPrix} €` : "Sélectionnez un poids"}
                            </span>
                            <span className="prixKilo">

                            </span>
                        </div>

                        <span className="descProduit">
                            {produit.desc_longue}
                        </span>

                        <div className="poidsProduit">
                        <span>Poids</span>
                            <select onChange={handlePoidsChange}>
                                {poids.map((item, i) => (
                                    <option key={i} value={item.poids}>{item.poids} g</option>
                                    ))}
                            </select>
                        </div>

                        <div className="qtePanier">
                            <div className="qte">
                                <button onClick={diminuerQuantite}>-</button>
                                <span>{quantite}</span>
                                <button onClick={augmenterQuantite}>+</button>
                            </div>

                            <div
                                id={`add-to-cart-${produit.id}`}
                                className="btn-primary ajouterAuPanier"
                                onClick={handleAddToCart}>
                                Ajouter au panier
                            </div>

                            {animating && (
                                <motion.img
                                    key={animationKey}
                                    src={`/assets/images/${produit.image}`}
                                    alt={produit.nom}
                                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                    animate={{
                                        x: animationPosition.x,
                                        y: animationPosition.y,
                                        opacity: 0,
                                        scale: 0.2
                                    }}
                                    transition={{ duration: 0.9, ease: "easeInOut" }}
                                    className="animation-panier"
                                />
                            )}

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
                <ProductList api={`${process.env.REACT_APP_API_URL}/api/home-best-sellers`} voirPlus={"/cafes"}/>

            </div>
        </div>
    );
}

export default PageProduit;