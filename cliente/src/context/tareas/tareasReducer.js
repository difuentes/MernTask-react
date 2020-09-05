import  {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
 } from '../../types';

 export default (state,action) =>{
    switch(action.type){
       
        case  TAREAS_PROYECTO :
            return{
                ...state,
                tareasProyectos : action.payload
            }
        case AGREGAR_TAREA:
            return{
                ...state,
                tareasProyectos : [...state.tareasProyectos,action.payload],
                errorTarea:false
            }

        case VALIDAR_TAREA:
            return{
                ...state,
                errorTarea:true
            }
        case ELIMINAR_TAREA:
            return{
                ...state,
                tareasProyectos: state.tareasProyectos.filter(tarea => tarea._id !== action.payload)
            }
        case ACTUALIZAR_TAREA:
       
            return{
                ...state,
                tareasProyectos: state.tareasProyectos.map(tarea => tarea._id === action.payload._id ? action.payload : tarea),
                tareaSeleccionada:null
            }
        case TAREA_ACTUAL :
            return{
                ...state,
                tareaSeleccionada: action.payload
            }
        case LIMPIAR_TAREA:
            return{
                ...state,
                tareaSeleccionada:null
            }
        default:
            return state;
        
    }
}