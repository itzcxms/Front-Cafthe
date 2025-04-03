import React from "react";
import "../styles/PagesLegales.css";

function CGV() {
    return (
        <div className="legal-container">
            <h1>Conditions Générales de Vente</h1>
            <p>Les présentes CGV régissent les ventes effectuées sur notre site.</p>

            <h2>1. Produits et services</h2>
            <p>Nos produits sont décrits avec la plus grande précision possible. Toutefois, des erreurs peuvent survenir.</p>

            <h2>2. Prix et paiement</h2>
            <p>Les prix affichés sont en euros (€) et incluent la TVA. Les paiements s'effectuent via les moyens sécurisés mis à disposition.</p>

            <h2>3. Livraison</h2>
            <p>Les délais de livraison varient en fonction du mode choisi. Nous ne sommes pas responsables des retards dus aux transporteurs.</p>

            <h2>4. Droit de rétractation</h2>
            <p>Vous avez un délai de 14 jours pour retourner un produit non utilisé et demander un remboursement.</p>

            <h2>5. Service client</h2>
            <p>Pour toute question, contactez-nous à support@votresite.com.</p>

            <p className="update-date">Dernière mise à jour : [Date]</p>
        </div>
    );
}

export default CGV;
