import React from "react";
import "../styles/PagesLegales.css";

function CGU() {
    return (
        <div className="legal-container">
            <h1>Conditions Générales d'Utilisation</h1>
            <p>Bienvenue sur notre site. En accédant et en utilisant ce site, vous acceptez sans réserve les présentes Conditions Générales d'Utilisation.</p>

            <h2>1. Objet</h2>
            <p>Les présentes CGU ont pour objet de définir les conditions d’utilisation du site par les utilisateurs.</p>

            <h2>2. Accès au service</h2>
            <p>Le site est accessible gratuitement à tout utilisateur disposant d’un accès à Internet.</p>

            <h2>3. Responsabilités</h2>
            <p>Nous nous efforçons d’assurer l’exactitude des informations disponibles sur notre site, mais nous ne pouvons garantir leur complétude.</p>

            <h2>4. Modification des CGU</h2>
            <p>Nous nous réservons le droit de modifier ces CGU à tout moment. Les utilisateurs seront informés des mises à jour.</p>

            <p className="update-date">Dernière mise à jour : [Date]</p>
        </div>
    );
}

export default CGU;
