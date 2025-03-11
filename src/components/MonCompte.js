import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function MonCompte() {
    const { user, logout } = useContext(AuthContext);

    console.log("User from context:", user); // Ajoute un log pour déboguer

    if (!user) {
        return <p>Veuillez vous connecter pour voir cette page.</p>;
    }

    return (
        <div>
            <h1>Mon Compte</h1>
            <p>Email: {user.email}</p>
            {/* Affiche d'autres informations de l'utilisateur ici */}
            <button onClick={logout}>Déconnexion</button>
        </div>
    );
}

export default MonCompte;
