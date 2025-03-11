import React from 'react';
import '../styles/Footer.css';

function Footer(props) {
    return (
        <div className="containerFooter">
            { /* Newsletter */}
            <div className="newsletter">
                <div className="containerNewsletter">
                    <div className={"containerImages"}>
                        <img src="./assets/images/sachet_cafe.png" alt=""/>
                        <img src="./assets/images/gobelet_cafe.png" className={"gobelet"} alt=""/>
                    </div>
                    <div className={"containerText"}>
                        <span className="titre">Restez branché l'équipe</span>
                        <span className="desc">
                        Abonnez-vous à notre newsletter et profitez de 10% de remise sur votre 1ère commande.
                    </span>
                        <div className="btn-secondary">S'inscrire</div>
                    </div>
                </div>
            </div>

            { /* Avis clients */ }
            { /* FAQ */ }
            { /* Footer */ }
        </div>

    )
        ;
}

export default Footer;