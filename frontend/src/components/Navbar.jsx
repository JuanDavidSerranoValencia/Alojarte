import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <Link to="/">Inicio</Link>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
        </nav>
    );
}

export default Navbar;
