import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import '../styles/Login.css';

function Login(props) {
    const { login } = useContext(AuthContext); // fonction login venant du contexte
    const navigate = useNavigate(); // la navigation

    const [email, setEmail] = useState("");
    const [mot_de_passe, setMot_de_passe] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/clients/login`,
                {
                    email,
                    mot_de_passe,
                }
            );

            const { jwtToken, client } = response.data;

            console.log("Réponse de l'API :", response.data); // Vérifie la réponse de l'API

            // Mise à jour du contexte d'authentification
            login(jwtToken, client); // Utilise jwtToken et client

            console.log("Données après login :", jwtToken, client);

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
                <h2>Connexion</h2>
                    <form className="forms" onSubmit={handleSubmit}>
                        <div className="containerInput">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Entrez votre adresse email"
                            />
                        </div>

                        <div className="containerInput ">
                            <label>Mot de passe</label>
                            <input
                                type="password"
                                value={mot_de_passe}
                                onChange={(e) => setMot_de_passe(e.target.value)}
                                required
                                placeholder="Entrez votre mot de passe"
                            />
                            <div className="mdp">
                                {/*TODO changer url*/}
                                <span className="mdpOublie"><Link to="/connexion">J'ai oublié mon mot de passe</Link></span>
                            </div>
                        </div>


                        <label id={"checkboxLabel"}>
                            <input
                                type="checkbox"
                                value={mot_de_passe}
                                onChange={(e) => setMot_de_passe(e.target.value)}
                                required
                                placeholder="Entrez votre mot de passe"
                            />
                            J'accepte les conditions générales
                        </label>

                        {errorMsg && (
                            <div style={{color: "red", marginBottom: 10}}>{errorMsg}</div>
                        )}

                        <button type="submit" className="btn-primary">Se connecter</button>

                        {/*TODO changer url*/}
                        <span>Pas encore de compte ? <Link to="/inscription">S'inscrire</Link></span>

                    </form>
            </div>
        </div>

    );
}

export default Login;