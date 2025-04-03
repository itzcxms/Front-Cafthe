import React, { useState, useContext } from 'react';
import '../styles/Navbar.css';
import logoCafthe from '../assets/images/logo-cafhe.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBagShopping,
    faCaretDown,
    faMagnifyingGlass,
    faUser,
    faBars,
    faXmark,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const MENUS_NAVBAR = [
    {
        title: 'Nos cafés',
        path: '/produits',
        isDropdown: true,
        dropdownItems: [
            { title: 'Café en grain', path: '/produits' },
            { title: 'Café moulu', path: '/produits' },
            { title: 'Café en capsule', path: '/produits' }
        ]
    },
    {
        title: 'Nos thés et infusions',
        path: '/produits',
        isDropdown: true,
        dropdownItems: [
            { title: 'Thés noirs', path: '/produits' },
            { title: 'Thés verts', path: '/produits' },
            { title: 'Infusions', path: '/produits' }
        ]
    },
    {
        title: 'Nos accessoires',
        path: '/produits',
        isDropdown: true,
        dropdownItems: [
            { title: 'Cafetières', path: '/produits' },
            { title: 'Théières', path: '/produits' },
            { title: 'Mugs', path: '/produits' }
        ]
    },
    { title: 'Le blog', path: '/blog', isDropdown: false },
    { title: 'À propos de nous', path: '/a-propos', isDropdown: false },
    { title: 'Contact', path: '/contact', isDropdown: false },
];

function Navbar() {
    const { isAuthenticated } = useContext(AuthContext);
    const { cart, totalItems, totalPrice, removeFromCart, updateQuantity } = useContext(CartContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [panierOuvert, setPanierOuvert] = useState(false);
    const [quantite, setQuantite] = useState(1);

    const togglePanier = () => {
        setPanierOuvert(!panierOuvert);
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Implémentation de la recherche
        console.log('Recherche :', searchTerm);
    };

    const toggleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const augmenterQuantite = () => {
        setQuantite(quantite + 1);
    };

    const diminuerQuantite = () => {
        if (quantite > 1) {
            setQuantite(quantite - 1);
        }
    };

    return (
        <>

        <nav className="navbar">
            <div className="container-navbar">
                <div className="navbar-top">
                    <div className="logo">
                        <Link to="/">
                            <img src={logoCafthe} alt="Logo"/>
                        </Link>
                    </div>

                    <form className="search-bar" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Trouvez votre café"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            aria-label="Rechercher"
                        />
                        <button type="submit" className="search-button" aria-label="Rechercher">
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </button>
                    </form>

                    <div className="navbar-actions">
                        {isAuthenticated ? (
                            <>
                                <Link to="/monCompte" className="navbar-icon" aria-label="Mon compte">
                                    <FontAwesomeIcon icon={faUser}/>
                                </Link>
                            </>
                        ) : (
                            <Link to="/connexion" className="navbar-icon" aria-label="Mon compte">
                                <FontAwesomeIcon icon={faUser}/>
                            </Link>
                        )}

                        <button
                            id="panier-icon"
                            className={"navbar-icon"}
                            onClick={togglePanier}
                            aria-label="Panier"
                        >
                            <FontAwesomeIcon icon={faBagShopping} id="fa-icon-panier" />
                            <span className="bullePanier">
                                {totalItems}
                            </span>
                        </button>

                        <button
                            className="mobile-menu-toggle"
                            onClick={toggleMobileMenu}
                            aria-label="Menu"
                        >
                            <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars}/>
                        </button>
                    </div>
                </div>

                <div className={`navbar-bottom ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <ul className="navbar-nav">
                        {MENUS_NAVBAR.map((item, index) => (
                            <li
                                key={index}
                                className={`nav-item ${item.isDropdown ? 'dropdown' : ''}`}
                                onMouseEnter={() => item.isDropdown && toggleDropdown(index)}
                                onMouseLeave={() => item.isDropdown && toggleDropdown(index)}
                            >
                                <NavLink
                                    to={item.path}
                                    className={({isActive}) => isActive ? 'active' : ''}
                                >
                                    {item.title}
                                    {item.isDropdown && (
                                        <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon"/>
                                    )}
                                </NavLink>

                                {item.isDropdown && activeDropdown === index && (
                                    <ul className="dropdown-menu">
                                        {item.dropdownItems.map((dropdownItem, dropIndex) => (
                                            <li key={dropIndex}>
                                                <NavLink to={dropdownItem.path}>
                                                    {dropdownItem.title}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>

    <div className={`panierSidebar ${panierOuvert ? 'open' : ''}`}>
        <button className="fermerPanier" onClick={togglePanier} aria-label="Fermer le panier">
            <FontAwesomeIcon icon={faXmark}/>
        </button>
        <h2>Votre Panier ({totalItems} articles)</h2>
        <ul>
            {cart.map((item) => (
                <li key={`${item.produit_id}-${item.variante_poids}`}>
                    <img src={`/assets/images/${item.image}`} alt="Nom du produit"/>
                    <div className="produitsPanierDetails">
                        <span className="produitNom">{item.nom}</span>
                        <span className="produitPoids">Poids : {item.variante_poids}g</span>
                        <span className="produitNom">{item.prix}€</span>
                        <div className="actions">
                            <div className="qte">
                                {/*On appelle CartContext pour modifier les qtes dynamiquement*/}
                                <button onClick={() => updateQuantity(item.produit_id, Math.max(1, item.quantite - 1), item.variante_poids)}>-</button>
                                <span>{item.quantite}</span>
                                <button onClick={() => updateQuantity(item.produit_id, item.quantite + 1)}>+</button>
                            </div>
                            <div className="supp">
                                <button onClick={() => removeFromCart(item.produit_id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>

        <Link to={"/commander"}>
            <button className="btn-primary btn-checkout" onClick={togglePanier}>Passer commande</button>
        </Link>
    </div>

        </>
    );
}

export default Navbar;