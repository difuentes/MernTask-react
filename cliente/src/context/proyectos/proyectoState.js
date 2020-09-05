import React,{useReducer} from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer'

import clienteAxios from '../../config/axios';

//types
import  {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTOS,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
}from '../../types';


const ProyectoState = props =>{

    //state 
    const initialState = {
         proyectos : [],
         formulario:false,
         errorFormulario:false,
         proyecto:null,
         mensaje:null
    }
    //dispatch para ejecutar las acciones 
    const [state,dispatch] = useReducer(proyectoReducer,initialState);
    //Funciones Crud
    const mostrarFormulario =() => {
        dispatch({
            type:FORMULARIO_PROYECTO
            
        })
    } 
    //obtener los proyectos 
    const obtenerProyectos = async () =>{

         try {
            
            const respuesta = await clienteAxios.get('/api/proyectos');
            //console.log(respuesta);
            dispatch({
                type: OBTENER_PROYECTOS,
                payload:respuesta.data.proyectos
            })

         } catch (error) {
            const alerta = {
                msg: 'hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
         }   

        
    }
    //Agregar nuevo proyecto
    const agregarProyecto = async proyecto => {
        
        try {
            
            const resultado = await clienteAxios.post('/api/proyectos', proyecto) ;
           // console.log(resultado.data);
            dispatch({
                type:AGREGAR_PROYECTOS,
                payload: resultado.data
            })
           
        } catch (error) {

            const alerta = {
                msg: 'hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
            
        }

        
    }
    //validar Formulario por errores
    const mostrarError =()=>{   
        dispatch({
            type:VALIDAR_FORMULARIO
        })
    }

     //Seleccionar el proyecto click
     const proyectoActual = proyectoId =>{
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //eliminar proyecto
    const eliminarProyecto = async proyectoId =>{

        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`)
            dispatch({
                type:ELIMINAR_PROYECTO,
                payload: proyectoId
            }) 
        } catch (error) {

            const alerta = {
                msg: 'hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }

       
    }



    return (
        <proyectoContext.Provider
            value={{
                formulario: state.formulario,
                proyectos: state.proyectos,
                proyecto :state.proyecto,
                mensaje :state.mensaje,
                errorFormulario:state.errorFormulario,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState;