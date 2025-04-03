import React from "react";
import "../styles/PagesLegales.css";

function MentionsLegales() {
    return (
        <div className="legal-container">
            <h1>Mentions Légales</h1>
            <p>Conformément aux articles 6-III et 19 de la loi pour la Confiance dans l’Économie Numérique, voici nos informations légales.</p>

            <h2>1. Éditeur du site</h2>
            <p>Nom de l'entreprise : Cafthé</p>
            <p>Email : contact@votresite.com</p>
            <p>Téléphone : +33 0 00 00 00 00</p>

            <h2>2. Hébergement</h2>
            <p>Le site est hébergé par : Plesk</p>

            <h2>3. Propriété intellectuelle</h2>
            <p>Tous les contenus de ce site sont protégés par les droits d’auteur et ne peuvent être réutilisés sans autorisation.</p>

            <h2>4. Responsabilité</h2>
            <p>Nous ne sommes pas responsables des éventuels dommages liés à l'utilisation du site.</p>

            <p className="update-date">Dernière mise à jour : 03/04/2025</p>
        </div>
    );
}

export default MentionsLegales;
