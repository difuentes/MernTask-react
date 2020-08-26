import React,{useReducer} from 'react';
import TareaContext from'./tareasContext';
import TareaReducer from './tareasReducer';
import {v4 as uuidv4 } from 'uuid';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types'

const TareaState = props => {
   
    //state inicial
    const initialState ={
        tareas:[
            { proyectoId:1, nombre:'Elegir Plataforma ', estado:true , id:1 },
            { proyectoId:2 ,nombre:'Elegir Pago ', estado:false, id:1  },
            { proyectoId:3, nombre:'Elegir Hosting ', estado:true , id:2 },
            { proyectoId:4, nombre:'Elegir Plataforma ', estado:true , id:2 },
            { proyectoId:5 ,nombre:'Elegir Pago ', estado:false, id:3  },
            { proyectoId:6, nombre:'Elegir Hosting ', estado:true , id:3 },
        ],
        tareasProyectos:null,
        errorTarea:false,
        tareaSeleccionada : null
    }

    //crear dispach y state

    const [state,dispach] = useReducer(TareaReducer,initialState);

    //crear funciones

    //obtener las tareas de un proyecto
    const obtenerTareas = proyectoId =>{
        
        dispach({
            type: TAREAS_PROYECTO,
            payload : proyectoId
        })
    }
    //agregar Tarea 
    const agregartarea = tarea =>{
        tarea.proyectoId = uuidv4();
        dispach({
            type:AGREGAR_TAREA,
            payload:tarea
        })
    }
    //valida y muestra un error
    const validarTarea =()=>{
        dispach({
            type:VALIDAR_TAREA
        })
    }
    //eliminar tarea por ID
    const eliminarTareaId = id => {
        dispach({
            type:ELIMINAR_TAREA,
            payload:id
        })
    }

    //cambiar estado de tarea
    const cambiarEstadoTarea = tarea =>{
        dispach({
            type:ESTADO_TAREA,
            payload:tarea
        })
    }
    //extraer una tarea para edicion
    const guardarTareaActual = tarea => {
        dispach({
            type:TAREA_ACTUAL,
            payload: tarea
        })
    } 
    //actualizar tarea 
    const actualizarTarea = tarea =>{
        dispach({
            type:ACTUALIZAR_TAREA,
            payload: tarea
        })
    }

    //Eliminar la tareaSeleccionada
    const limpiarTarea =()=>{
        dispach({
            type:LIMPIAR_TAREA
        })
    }

    return(
        <TareaContext.Provider
            value={{
                tareaSeleccionada : state.tareaSeleccionada,
                tareas :state.tareas,
                tareasProyectos : state.tareasProyectos,
                errorTarea: state.errorTarea,
                obtenerTareas,
                agregartarea ,
                validarTarea,
                eliminarTareaId,
                cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea

            }}
        >
            {props.children}
        </TareaContext.Provider>
    )

}
 
export default TareaState;