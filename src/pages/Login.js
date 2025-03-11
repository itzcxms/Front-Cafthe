import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
        <div style={{ margin: "50px auto", maxWidth: 400 }}>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 10 }}>
                    <label>Email :</label>
                    <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <div style={{ marginBottom: 10 }}>
                    <label>Mot de passe :</label>
                    <br />
                    <input
                        type="password"
                        value={mot_de_passe}
                        onChange={(e) => setMot_de_passe(e.target.value)}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                {errorMsg && (
                    <div style={{ color: "red", marginBottom: 10 }}>{errorMsg}</div>
                )}
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;