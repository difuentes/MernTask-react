import React,{useReducer} from 'react';
import {v4 as uuidv4 } from 'uuid';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer'


//types
import  {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTOS,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
}from '../../types';



const ProyectoState = props =>{

    const proyectos =[
        {id:1, nombre:'Taller JS'},
        {id:2,  nombre:'Taller React'},
        {id:3, nombre:'Taller ANGULAR'},
    ]
    
    //state 
    const initialState = {
         proyectos : [ ],
         formulario:false,
         errorFormulario:false,
         proyecto:null
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
    const obtenerProyectos = () =>{
        dispatch({
            type:OBTENER_PROYECTOS,
            payload:proyectos
        })
    }
    //Agregar nuevo proyecto
    const agregarProyecto = proyecto => {
        proyecto.id =  uuidv4();
        //agregar proyecto al state
        dispatch({
            type:AGREGAR_PROYECTOS,
            payload:proyecto
        })
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
    const eliminarProyecto = proyectoId =>{
        dispatch({
            type:ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }



    return (
        <proyectoContext.Provider
            value={{
                formulario: state.formulario,
                proyectos: state.proyectos,
                proyecto :state.proyecto,
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