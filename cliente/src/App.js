import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from '../src/components/auth/Login';
import NuevaCuenta from '../src/components/auth/NuevaCuenta';
import Proyectos from '../src/components/proyectos/Proyectos';

//state proyectos
import ProyectoState from './context/proyectos/proyectoState';
//state tareas
import TareaState from './context/tareas/tareasState';

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <Router>
          <Switch>
              <Route exact to path="/" component={Login}/>
              <Route exact to path="/nuevaCuenta" component={NuevaCuenta}/>
              <Route exact to path="/proyectos" component={Proyectos}/>
            
          </Switch>
      </Router>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
