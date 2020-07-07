import React, { Component } from 'react';
import Router from './componentes/Router';
import history from "./utils/history";


class App extends Component {
  render() {
    return (
      <div className="contenedor">
        <Router history={history}/>
      </div>
    );
  }
} 

export default App;