import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import "../styles/PageProduit.css";
import ProductList from "./ProductList";

function PageProduit(props) {
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

    const [poids, setPoids] = useState([]);

    useEffect(() => {
        const fetchPoids = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/variantes/poids/${id}`);
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
                            {selectedPrix ? `${selectedPrix} €` : "Sélectionnez un poids"}
                        </span>
                        <span className="prixKilo">

                        </span>
                        <p className="descProduit">
                            {produit.desc_longue}
                        </p>

                        <div className="poidsProduit">
                            <span>Poids</span>
                            <select onChange={handlePoidsChange}>
                                {poids.map((item, i) => (
                                    <option key={i} value={item.poids}>{item.poids} g</option>
                                    ))}
                            </select>
                        </div>

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

export default PageProduit;