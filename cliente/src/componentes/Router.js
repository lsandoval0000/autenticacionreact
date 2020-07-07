import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Nosotros from './Nosotros/Nosotros';
import Error from './Error/Error';
import Productos from './Productos/Productos';
import Header from './Header/Header';
import SingleProducto from './SingleProducto/SingleProducto';
import Navegacion from './Navegacion/Navegacion';
import Contacto from './Contacto/Contacto';
import Landing from './Landing/Landing'
import { useAuth0 } from "@auth0/auth0-react";
import Loading from './Loading/Loading';

const Router = (props) => {
    const { isLoading, error,getAccessTokenSilently } = useAuth0();

    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isLoading) {
        return <Loading/>
    }

    return (
        <BrowserRouter>
            <Header/>
            <Navegacion/>
            <Switch>
                <Route exact path="/" component={Landing}/>
                <Route exact path="/nosotros" component={Nosotros} />
                <Route exact path="/productos" component={Productos}/>
                <Route exact path="/productos/:productoId" render={ (props) =>(
                    <SingleProducto
                        idProducto = {props.match.params.productoId}
                        getAccessTokenSilently = {getAccessTokenSilently}
                    />
                )} />
                <Route exact path="/contacto" component={Contacto} />
                <Route component={Error} />
            </Switch>
        </BrowserRouter>
    );
}
 
export default Router;