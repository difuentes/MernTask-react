import React,{useReducer,useContext} from 'react';
import AuthContext from './authContex';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token';

import AlertaContext from '../../context/alertas/alertasContex'

import {
    REGRISTRO_EXITOSO ,
    REGRISTRO_ERROR ,
    OBTENER_USUARIO ,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
}
from '../../types'



const AuthState = props => {


     //extraer los valores del context alerta
     const alertaContext =  useContext(AlertaContext);
     const {alerta,mostrarAlerta} = alertaContext;

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: false,
        usuario : null,
        mensaje: null,
        cargando: true,
    }
    
    const [state,dispatch] = useReducer(AuthReducer,initialState);
    
    //funciones

    //registrar Usuario 
    const registrarUsuario = async datos =>{

        try {
            //consumir API
            const respuesta = await clienteAxios.post('/api/usuarios' , datos);
            console.log(respuesta.data);

            dispatch({
                type:REGRISTRO_EXITOSO,
                payload:respuesta.data
                
            })
            //obtener datos del usuario
            usuarioAutenticado()

        } catch (error) {
            console.log(error);

            const alerta ={
                msg: error.response.data.msg,
                categoria:'alerta-error'
            }

            dispatch({
                type:REGRISTRO_ERROR,
                payload: alerta
            })

        }
    }

    //Obtener datos usuario
    const usuarioAutenticado = async () =>{
        const token = localStorage.getItem('token');
        if(token){
            //TODO : Funcion para enviar el token por headers
            tokenAuth(token);
            console.log("entra al token"+token );
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            console.log(respuesta.data);
            dispatch({
                type:OBTENER_USUARIO,
                payload:respuesta.data.usuario
            });

        } catch (error) {
            console.log(error);
            dispatch({
                type:LOGIN_ERROR
            })
        }
    }

    //Inicio de sesion
    const iniciarSesion = async datos => {
        try {
            // console.log( datos);
            const respuesta = await clienteAxios.post('/api/auth', datos);
            console.log(respuesta)
            dispatch({
                type:LOGIN_EXITOSO,
                payload: respuesta.data
            })

            //obtener datos del usuario
            usuarioAutenticado()

        } catch (error) {

            //console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria:'alerta-error'
            }
            console.log(alerta);

            setTimeout(()=>{
                mostrarAlerta(alerta.msg,alerta.categoria);
            },1000)
            
            dispatch({
                type: REGRISTRO_ERROR,
                payload: alerta
            }) 
            
            
            
        }
    }

    //cerrar sesion 
    const cerrarSesion =() =>{
        dispatch({
            type:CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado : state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
      );
}
 
export default AuthState;