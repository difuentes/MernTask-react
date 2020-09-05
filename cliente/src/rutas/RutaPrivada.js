import React,{useContext,useEffect} from 'react'
import {Route,Redirect} from 'react-router-dom'
import AuthContext from '../context/autenticacion/authContex'

const RutaPrivada = ({component: Component, ...props}) => {

    //context auteticacion
    const authcontext = useContext(AuthContext);
    const {autenticado,usuarioAutenticado ,cargando} = authcontext;

    useEffect(()=>{
        usuarioAutenticado();
        //eslint-disable-next-line
    },[usuarioAutenticado])

    return (
        <Route{...props}render={ props => !autenticado && !cargando ? (<Redirect to="/"/> )  : (<Component {...props}/>) }>
                
        </Route>
      );
}
 
export default RutaPrivada;

