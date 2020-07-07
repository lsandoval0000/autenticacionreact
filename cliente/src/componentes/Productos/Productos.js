import React, { useState, useEffect } from 'react';
import Producto from '../Producto/Producto';
import './Productos.css';
import Buscador from '../Buscador/Buscador';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from 'axios';
import Loading from '../Loading/Loading';

const Productos = (props) => {
    const [state,setState] = useState({
        productos: [],
        terminoBusqueda: ''
    });

    const {
        isAuthenticated,
        loginWithRedirect,
        getAccessTokenSilently
    } = useAuth0();

    const callApi = async ()=>{
        const token = await getAccessTokenSilently();
        const headers= {
            'Authorization': `Bearer ${token}`
        };
        const url = 'http://localhost:5000/productos';
        
        const respuesta = await axios.get(url, { headers });
        const respuestaData = await respuesta.data;
        setState({
            ...state,
            productos : respuestaData
        });
    }

    const busquedaProducto = (busqueda)=>{
        if(busqueda.length > 3){
            let productos = [...state.productos];
            let resultado = productos.filter( (producto) => (
                producto.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1
            ));

            setState({
                productos:resultado,
                terminoBusqueda:busqueda
            });
        }else{
            setState({
                ...state,
                terminoBusqueda:''
            },callApi());
        }
    }

    useEffect (()=>{
        callApi();
    },[]);

    return (
        <div className="productos">
            {isAuthenticated && (
                <React.Fragment>
                    <h2>NUESTOS PRODUCTOS</h2>
                    <Buscador
                        busqueda = {busquedaProducto}
                    />
                    <ul className="lista-productos">
                        {state.productos.map(producto =>(
                            <Producto
                                informacion = {producto}
                                key = {producto.id}
                            />
                        ))}
                    </ul>
                </React.Fragment>
            )}
            
            {!isAuthenticated && (
                <div className="contenedor-boton">
                    <p>Para ver el contenido, debes estar logueado:</p>
                    <a className="boton" onClick={() => loginWithRedirect()}>Iniciar Sesión</a>
                </div>    
            )}
        </div>
    );
}

export default withAuthenticationRequired(Productos,{
    onRedirecting : ()=> <Loading />
});