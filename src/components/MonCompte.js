import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

function MonCompte() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate(); // la navigation

    console.log("User from context:", user); // Ajoute un log pour déboguer

    if (!user) {
        navigate("/connexion");
    }
    else {
        return (
            <div>
                <h1>Mon Compte</h1>
                <p>Email: {user.email}</p>
                {/* Affiche d'autres informations de l'utilisateur ici */}
                <button onClick={logout}>Déconnexion</button>
            </div>
        );
    }
}

export default MonCompte;
