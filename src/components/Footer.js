import React from 'react';
import '../styles/Footer.css';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="container">
                {/* Newsletter */}
                <div className="menu-newsletter">
                    <h3>Restez informés</h3>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Votre e-mail" required />
                        <button type="submit">S'inscrire</button>
                    </form>
                </div>

                {/* Menu Catégories */}
                <div className="menu-liens">
                    <h3>Nos catégories</h3>
                    <ul>
                        <li><Link to="/categories/cafes/">Cafés</Link></li>
                        <li><Link to="/categories/thes/">Thés</Link></li>
                        <li><Link to="/categories/infusions/">Infusions</Link></li>
                        <li><Link to="/categories/accessoires/">Accessoires</Link></li>
                    </ul>
                </div>

                {/* Liens utiles */}
                <div className="menu-liens">
                    <h3>Liens utiles</h3>
                    <ul>
                        <li><Link to="/cgu">CGU</Link></li>
                        <li><Link to="/cgv">CGV</Link></li>
                        <li><Link to="/mentions-legales">Mentions légales</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
