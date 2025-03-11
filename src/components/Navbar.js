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
    faXmark
} from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const NAV_ITEMS = [
    {
        title: 'Nos cafés',
        path: '/cafes',
        isDropdown: true,
        dropdownItems: [
            { title: 'Café en grain', path: '/cafes/grain' },
            { title: 'Café moulu', path: '/cafes/moulu' },
            { title: 'Café en capsule', path: '/cafes/capsule' }
        ]
    },
    {
        title: 'Nos thés et infusions',
        path: '/thes',
        isDropdown: true,
        dropdownItems: [
            { title: 'Thés noirs', path: '/thes/noirs' },
            { title: 'Thés verts', path: '/thes/verts' },
            { title: 'Infusions', path: '/infusions' }
        ]
    },
    {
        title: 'Nos accessoires',
        path: '/accessoires',
        isDropdown: true,
        dropdownItems: [
            { title: 'Cafetières', path: '/accessoires/cafetieres' },
            { title: 'Théières', path: '/accessoires/theieres' },
            { title: 'Mugs', path: '/accessoires/mugs' }
        ]
    },
    { title: 'Le blog', path: '/blog', isDropdown: false },
    { title: 'À propos de nous', path: '/a-propos', isDropdown: false },
    { title: 'Contact', path: '/contact', isDropdown: false },
];

function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="container-navbar">
                <div className="navbar-top">
                    <div className="logo">
                        <Link to="/">
                            <img src={logoCafthe} alt="Logo" />
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
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>

                    <div className="navbar-actions">
                        { isAuthenticated ? (
                            <>
                                <Link to="/monCompte" className="navbar-icon" aria-label="Mon compte">
                                    <FontAwesomeIcon icon={faUser} />
                                </Link>
                            </>
                        ) : (
                            <Link to="/connexion" className="navbar-icon" aria-label="Mon compte">
                                <FontAwesomeIcon icon={faUser} />
                            </Link>
                        )}


                        <Link to="/panier" className="navbar-icon" aria-label="Mon panier">
                            <FontAwesomeIcon icon={faBagShopping} />
                        </Link>

                        <button
                            className="mobile-menu-toggle"
                            onClick={toggleMobileMenu}
                            aria-label="Menu"
                        >
                            <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} />
                        </button>
                    </div>
                </div>

                <div className={`navbar-bottom ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <ul className="navbar-nav">
                        {NAV_ITEMS.map((item, index) => (
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
                                        <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon" />
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
    );
}

export default Navbar;