import React, { Component } from 'react';
import './SingleProducto.css';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from 'axios';
import Loading from '../Loading/Loading';

class SingleProducto extends Component {

    constructor(props){
        super(props);
        this.state = {
            producto : {}
        };
    }
    
    callApi = async ()=>{
        const idProducto = this.props.idProducto;
        const token = await this.props.getAccessTokenSilently();
        const headers= {
            'Authorization': `Bearer ${token}`
        };
        const url = `http://localhost:5000/producto/${idProducto}`;
        
        const respuesta = await axios.get(url, { headers });
        const respuestaData = await respuesta.data;
        if(respuestaData.length > 0){
            this.setState({
                producto:respuestaData[0]
            });   
        }else{
            return null;
        }
    }

    componentDidMount() {
        this.callApi();
    }

    render() { 
        return ( 
            <div className="info-producto">
                <div className="imagen">
                    <img src={`/img/${this.state.producto.imagen}.png`} alt={this.state.producto.nombre} />
                </div>
                <div className="info">
                    <h2>{this.state.producto.nombre}</h2>
                    <p className="precio">{this.state.producto.precio}</p>
                    <p>{this.state.producto.descripcion}</p>
                </div>
            </div>
        );
    }
}

export default withAuthenticationRequired(SingleProducto,{
    onRedirecting: ()=> <Loading/>
});