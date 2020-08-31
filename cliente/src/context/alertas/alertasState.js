import React,{useReducer} from 'react'
import alertaReducer from './alertasReducer'
import alertaContext from './alertasContex'

import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
}
from '../../types'

const AlertaState = props => {

    const initialState = {
        alerta: null
    }

    const[state,dispatch] = useReducer(alertaReducer,initialState);


    //mostrar Alerta
    const mostrarAlerta = (msg,categoria) =>{
        dispatch({
            type: MOSTRAR_ALERTA,
            payload :{
                msg,
                categoria
            }
        });

        setTimeout(()=>{
            
                dispatch({
                    type:OCULTAR_ALERTA
                })
            
        },5000 )
    }

    return (
        <alertaContext.Provider
            value={{
                alerta : state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
      );
}
 
export default AlertaState;