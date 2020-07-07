import React from 'react';
import './Navegacion.css';
import {NavLink} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Navegacion = () => {
    let resultado;
    const {
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0();

    if(isAuthenticated){
        resultado = 
            <a className="boton" onClick={() => logout()}>Cerrar Sesión</a>
    }else{
        resultado = 
            <a className="boton" onClick={() => loginWithRedirect()}>Iniciar Sesión</a>
    }

    return (
        <nav className="navegacion">
            <NavLink to={'/nosotros'} activeClassName="activo">Nosotros</NavLink>
            <NavLink to={'/productos'} activeClassName="activo">Productos</NavLink>
            <NavLink to={'/contacto'} activeClassName="activo">Contacto</NavLink>
            {resultado}
        </nav>
    );
};

export default Navegacion;