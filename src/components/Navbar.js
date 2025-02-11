import React from 'react';
import '../styles/Navbar.css';
import logoCafthe from '../assets/images/logo-cafhe.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBagShopping, faCaretDown, faMagnifyingGlass, faUser} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

function Navbar(props) {
    return (
        <nav>
            <div className="container-navbar">
                <div className="navbar-top">
                    <div className="logo">
                        <img src={logoCafthe} alt="" />
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Trouvez votre café" />
                        <div className="icone-recherche">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                    </div>
                    {/* TODO : agrandir les icones*/}
                    <div className="logos-droite">
                        <div className="logo-user">
                            <Link to={`/connexion`}>
                            <FontAwesomeIcon icon={faUser} />
                            </Link>
                        </div>
                        <div className="logo-panier">
                            <FontAwesomeIcon icon={faBagShopping} />
                        </div>
                    </div>
                </div>
                <div className="navbar-bottom">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">Nos cafés <FontAwesomeIcon icon={faCaretDown} /></li>
                        <li className="nav-item dropdown">Nos thés et infusions <FontAwesomeIcon icon={faCaretDown} /></li>
                        <li className="nav-item dropdown">Nos accessoires <FontAwesomeIcon icon={faCaretDown} /></li>
                        <li className="nav-item">Le blog</li>
                        <li className="nav-item">À propos de nous</li>
                        <li className="nav-item">Contact</li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;