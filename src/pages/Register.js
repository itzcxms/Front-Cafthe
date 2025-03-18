import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import '../styles/Login.css';

function Register(props) {
    const { login } = useContext(AuthContext); // fonction login venant du contexte
    const navigate = useNavigate(); // la navigation

    const [prenom, setPrenom] = useState("")
    const [nom, setNom] = useState("")
    const [email, setEmail] = useState("");
    const [mot_de_passe, setMot_de_passe] = useState("");
    const [adresse, setAdresse] = useState("");
    const [telephone, setTelephone] = useState("");
    const [conditions, setConditions] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (!conditions) {
            setErrorMsg("Vous devez accepter les conditions générales pour vous inscrire");
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/clients/register`,
                {
                    prenom,
                    nom,
                    email,
                    mot_de_passe,
                    adresse: adresse || null,
                    telephone: telephone || null,
                }
            );

            console.log("Réponse de l'API :", response.data); // Vérifie la réponse de l'API

            // Après inscription on connecte automatiquement l'utilisateur
            const loginResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/clients/login`,
                {
                    email,
                    mot_de_passe
                }
            );

            console.log("Réponse après connexion :", loginResponse.data);

            const { jwtToken, client } = loginResponse.data;

            console.log("Login appelé avec :", jwtToken, client);


            // Mise à jour du contexte d'authentification
            login(jwtToken, client); // Utilise jwtToken et client

            navigate("/monCompte"); // Redirection vers la page d'accueil après la connexion

        } catch (error) {
            console.error("Erreur lors de la connexion : ", error);
            if (error.response && error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg("Erreur inconnue lors de la connexion");
            }
        }
    };


    return (
        <div className="loginPage">
            <div className="loginImage">

            </div>
            <div className="loginInfos">
                <h2>Inscription</h2>
                    <form className={"forms"} onSubmit={handleSubmit}>
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
                            <label>Mot de passe</label>
                            <input
                                type="password"
                                value={mot_de_passe}
                                onChange={(e) => setMot_de_passe(e.target.value)}
                                required
                                placeholder="Entrez votre mot de passe"
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

                        <button type="submit" className="btn-primary">S'inscrire</button>

                        {/*TODO changer url*/}
                        <span>Vous avez déjà un compte ? <Link to="/connexion">Se connecter</Link></span>

                    </form>
            </div>
        </div>

    );
}

export default Register;