import React from 'react';
import '../styles/Header.css';

function Header(props) {
    return (
        <div className="banniere">
            <span className="texte-banniere">
                -10% avec le code CAFTHE10 🛒
            </span>
        </div>
    );
}

export default Header;