import React,{useReducer} from 'react';
import TareaContext from'./tareasContext';
import TareaReducer from './tareasReducer';
import clienteAxios from '../../config/axios'

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types'

const TareaState = props => {
   
    //state inicial
    const initialState ={
        tareasProyectos: [],
        errorTarea:false,
        tareaSeleccionada : null
    }

    //crear dispach y state

    const [state,dispach] = useReducer(TareaReducer,initialState);

    //crear funciones

    //obtener las tareas de un proyecto
    const obtenerTareas = async proyecto =>{
        
        try {
            const respuesta = await clienteAxios.get('/api/tareas/', {params:{proyecto}})

            dispach({
                type: TAREAS_PROYECTO,
                payload : respuesta.data.tareas
            })

        } catch (error) {
            console.log(error)
        }

       
    }
    //agregar Tarea 
    const agregartarea = async tarea =>{
        
        try {
            
            const respuesta = await clienteAxios.post('/api/tareas',tarea)
            console.log(respuesta);
            dispach({
                type:AGREGAR_TAREA,
                payload:tarea
            })

        } catch (error) {
            console.log(error)
        }


        
    }
    //valida y muestra un error
    const validarTarea =()=>{
        dispach({
            type:VALIDAR_TAREA
        })
    }
    //eliminar tarea por ID
    const eliminarTareaId = async (id,proyecto) => {

        try {

            //console.log(id);
            //console.log(proyecto);
             await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}})

            dispach({
                type:ELIMINAR_TAREA,
                payload:id
            })
        } catch (error) {
            console.log(error)
        }

        
    }

     //actualizar tarea 
     const actualizarTarea = async tarea =>{

        try {

            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            
            dispach({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })

        } catch (error) {
           console.log(error)
        }


       
    }
    //extraer una tarea para edicion
    const guardarTareaActual = tarea => {
        dispach({
            type:TAREA_ACTUAL,
            payload: tarea
        })
    } 
   

    //Eliminar la tareaSeleccionada
    const limpiarTarea = () =>{
        dispach({
            type:LIMPIAR_TAREA
        })
    }

    return(
        <TareaContext.Provider
            value={{
                tareaSeleccionada : state.tareaSeleccionada,
                tareasProyectos : state.tareasProyectos,
                errorTarea: state.errorTarea,
                obtenerTareas,
                agregartarea ,
                validarTarea,
                eliminarTareaId,
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