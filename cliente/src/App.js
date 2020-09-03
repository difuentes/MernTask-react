import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from '../src/components/auth/Login';
import NuevaCuenta from '../src/components/auth/NuevaCuenta';
import Proyectos from '../src/components/proyectos/Proyectos';
import AlertaState from '../src/context/alertas/alertasState'
import AuthState from './context/autenticacion/authState'

//state proyectos
import ProyectoState from './context/proyectos/proyectoState';
//state tareas
import TareaState from './context/tareas/tareasState';

import RutaPrivada from './rutas/RutaPrivada';

//import 
import AuthToke from './config/token';
//revisar si tenemos un token 
const token = localStorage.getItem('token');

if(token){
  AuthToke(token);
}

function App() {



  return (
    <ProyectoState>
      <TareaState>
         <AlertaState>
          <AuthState>
              <Router>
                <Switch>
                    <Route exact to path="/" component={Login}/>
                    <Route exact to path="/nuevaCuenta" component={NuevaCuenta}/>
                    <RutaPrivada exact to path="/proyectos" component={Proyectos}/>
                </Switch>
              </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
