import React,{useReducer} from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer'
import  {FORMULARIO_PROYECTO,OBTENER_PROYECTOS } from '../../types';




const ProyectoState = props =>{
    const proyectos =[
        {id:1, nombre:'Taller JS'},
        {id:2,  nombre:'Taller React'},
        {id:3, nombre:'Taller ANGULAR'},
    ]
    

    //state 
    const initialState = {
         proyectos : [ ],
         formulario:false
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


    return (
        <proyectoContext.Provider
            value={{
                formulario: state.formulario,
                proyectos: state.proyectos,
                mostrarFormulario,
                obtenerProyectos
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState;