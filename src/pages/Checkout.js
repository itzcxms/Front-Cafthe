import React, {useState, useContext, useEffect} from 'react';
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash,faArrowRight, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import '../styles/Checkout.css';


function Checkout(props) {

    const { isAuthenticated, user } = useContext(AuthContext);
    const { cart, totalItems, totalPrice, removeFromCart, updateQuantity } = useContext(CartContext);

    const [prenom, setPrenom] = useState("")
    const [nom, setNom] = useState("")
    const [email, setEmail] = useState("");
    const [mot_de_passe, setMot_de_passe] = useState("");
    const [adresse, setAdresse] = useState("");
    const [telephone, setTelephone] = useState("");
    const [conditions, setConditions] = useState(false);
    const [livraison, setLivraison] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (isAuthenticated && user) {
            setPrenom(user.prenom || "");
            setNom(user.nom || "");
            setEmail(user.email || "");
            setTelephone(user.telephone || "");
            setAdresse(user.adresse || "");
        }
    }, [isAuthenticated, user]);

    return (
        <div className="checkout">
            <div className="containerCheckout">
                <div className="infosFacturation">
                    <h2>Complétez vos informations</h2>
                    <div className="containerInfos">
                        <div className="titreSection">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <div>
                                <span id={"titre"}>Détails de facturation</span>
                                <span id={"sous-titre"}>Les champs marqués d'une (*) sont obligatoires</span>
                            </div>
                        </div>
                        <form className={"forms"}>
                            <div className="choixLivraison">
                                <label id={"checkboxLabel"}>
                                    <input type="radio"
                                           name={"choixLivraison"}
                                           value={"livraison"}
                                    />
                                    Livraison
                                </label>

                                <label id={"checkboxLabel"}>
                                    <input type="radio"
                                           name={"choixLivraison"}
                                           value={"retrait"}
                                    />
                                    Retrait
                                </label>
                            </div>


                            <div className="inputs">
                                <label>Prénom</label>
                                <input
                                    type="prenom"
                                    value={prenom}
                                    onChange={(e) => setPrenom(e.target.value)}
                                    required
                                    placeholder="Entrez votre prénom"
                                />
                            </div>

                            <div className="inputs">
                                <label>Nom</label>
                                <input
                                    type="nom"
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value)}
                                    required
                                    placeholder="Entrez votre nom"
                                />
                            </div>

                            <div className="inputs">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Entrez votre adresse email"
                                />
                            </div>

                            <div className="inputs">
                                <label>Adresse</label>
                                <input
                                    type="text"
                                    value={adresse}
                                    onChange={(e) => setAdresse(e.target.value)}
                                    placeholder="Entrez votre adresse"
                                />
                            </div>

                            <div className="inputs">
                                <label>Téléphone</label>
                                <input
                                    type="tel"
                                    value={telephone}
                                    onChange={(e) => setTelephone(e.target.value)}
                                    placeholder="Entrez votre numéro de téléphone"
                                />
                            </div>


                            <label id={"checkboxLabel"}>
                                <input
                                    type="checkbox"
                                    checked={conditions}
                                    onChange={(e) => setConditions(e.target.checked)}
                                    required
                                />
                                J'accepte les conditions générales
                            </label>

                            {errorMsg && (
                                <div style={{color: "red", marginBottom: 10}}>{errorMsg}</div>
                            )}

                        </form>
                    </div>
                </div>

                <div className="panierCheckout">
                    <h2>Panier</h2>
                    <div className="panierCheckoutContainer">
                        <ul>
                            {cart.map((item) => (
                                <li key={`${item.produit_id}-${item.variante_poids}`}>
                                    <img src={`/assets/images/${item.image}`} alt="Nom du produit"/>
                                    <div className="produitsPanierDetails">
                                        <span className="produitNom">{item.nom}</span>
                                        <span className="produitNom">{item.prix}€</span>
                                        <span className="produitPoids">Poids : {item.variante_poids}g</span>
                                        <div className="actions">
                                            <div className="qte">
                                                {/*On appelle CartContext pour modifier les qtes dynamiquement*/}
                                                <button
                                                    onClick={() => updateQuantity(item.produit_id, Math.max(1, item.quantite - 1), item.variante_poids)}>-
                                                </button>
                                                <span>{item.quantite}</span>
                                                <button onClick={() => updateQuantity(item.produit_id, item.quantite + 1)}>+
                                                </button>
                                            </div>
                                            <div className="supp">
                                                <button onClick={() => removeFromCart(item.produit_id)}>
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <hr/>

                        <div id="codePromo">
                            <span>Avez-vous un code promo ?</span>
                            <div className="forms" id={"champCodePromo"}>
                                <input
                                    type="text"
                                    placeholder="Code promo"
                                />
                                <button className={"btn-primary"}><FontAwesomeIcon icon={faArrowRight} /></button>
                            </div>
                        </div>

                        <div className="sousTotal">
                            <span>Sous-total</span>
                            <span>{totalPrice.toFixed(2)} €</span>
                        </div>
                        <div className="sousTotal">
                            <span>Livraison</span>
                            <span>3.50 €</span>
                        </div>
                        <div className="sousTotal total">
                            <span>Total</span>
                            <span>{(totalPrice+3.50).toFixed(2)} €</span>
                        </div>

                        <button className="btn-primary">
                        Confirmer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;