import React from 'react';
import '../styles/Footer.css';

function Footer(props) {
    return (
        <div className="containerFooter">
            { /* Newsletter
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
            */}

            { /* Avis clients */ }
            { /* FAQ */ }
            
            <footer>
            <div className="container">
                {/* Menu 1*/}
                <div className={"menu1"}>
                    <h3>Restez informés</h3>
                    <div className="mail">
                        <input type="text" placeholder="Votre e-mail" />
                    </div>
                </div>

                {/* Menu 2*/}
                <div className="menu-liens">
                    <h3>Nos catégories</h3>
                    <ul>
                        <li>
                            <Link to={`/categories/cafes/`}>Cafés</Link>
                        </li>

                        <li>
                            <Link to={`/categories/thes/`}>Thés</Link>
                        </li>

                        <li>
                            <Link to={`/categories/infusions/`}>Infusions</Link>
                        </li>

                        <li>
                            <Link to={`/categories/accessoires/`}>Accessoires</Link>
                        </li>
                    </ul>
                </div>

                {/* Menu 3*/}
                <div className="menu-liens">
                    <h3>Liens utiles</h3>
                    <ul>
                        <li>
                            <Link to={`/categories/cafes/`}>Cafés</Link>
                        </li>

                        <li>
                            <Link to={`/categories/thes/`}>Thés</Link>
                        </li>

                        <li>
                            <Link to={`/categories/infusions/`}>Infusions</Link>
                        </li>

                        <li>
                            <Link to={`/categories/accessoires/`}>Accessoires</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    
        </div>

    )
        ;
}

export default Footer;
