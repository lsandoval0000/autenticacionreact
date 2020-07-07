import React from 'react';
import './Contacto.css';
import {useAuth0} from '@auth0/auth0-react';

const Contacto = () => {
    const {
        isAuthenticated,
        loginWithRedirect
    } = useAuth0();

    return (
        <React.Fragment>
            {!isAuthenticated && (
                <div className="contenedor-boton">
                    <p>Para enviar un mensaje, debes estar logueado:</p>
                    <a className="boton" onClick={() => loginWithRedirect()}>Iniciar Sesión</a>
                </div>   
            )}
            {isAuthenticated && (
                <form>
                    <legend>Formulario de Contacto</legend>
                    <div className="input-field">
                        <label>Nombre: </label>
                        <input type="text" placeholder="Tu nombre" />
                    </div>
                    <div className="input-field">
                        <label>Email: </label>
                        <input type="email" placeholder="Tu email" />
                    </div>
                    <div className="input-field">
                        <label>Mensaje: </label>
                        <textarea></textarea>
                    </div>
                    <div className="input-field enviar">
                        <input type="submit" value="Enviar" />
                    </div>
                </form>
            )}
        </React.Fragment>
    );
};

export default Contacto;