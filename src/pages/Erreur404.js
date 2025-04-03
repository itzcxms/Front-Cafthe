import React from "react";
import { Link } from "react-router-dom";
import "../styles/Erreur404.css";

function Error404() {
    return (
        <div className="error-404-container">
            <h1>404</h1>
            <h2>Oups ! Page introuvable</h2>
            <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
            <Link to="/">
                <div className="btn-primary">
                    Retour à l'accueil
                </div>
            </Link>

        </div>
    );
}

export default Error404;