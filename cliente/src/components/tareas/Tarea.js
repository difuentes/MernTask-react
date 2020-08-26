import React,{useContext} from 'react'
import tareaContext from '../../context/tareas/tareasContext';
import ProyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({tarea}) => {

     //obtener el state del proyectos
     const proyectoContext = useContext(ProyectoContext);
     const {proyecto } = proyectoContext;
 

    //extraer tarea de state 
    const TareaContex = useContext(tareaContext);
    const {eliminarTareaId,obtenerTareas,cambiarEstadoTarea,guardarTareaActual} = TareaContex;

    //extraerElProyecto
    const [proyectoActual]= proyecto


    //funcion para eliminar tarea
    const tareaEliminar = id =>{
        eliminarTareaId(id);
        obtenerTareas(proyectoActual.id);
    }
    //funcion cambiar estado de tarea
    const cambiarEstado = tarea =>{
        if(tarea.estado){
            tarea.estado= false;
        }
        else{
            tarea.estado= true;
        }
        cambiarEstadoTarea(tarea)
    }
    //agregar tarea acual para editar 
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
       <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado 
                    ? (<button  onClick={() => cambiarEstado(tarea)} type="button" className="completo">Completo</button>)
                    : (<button  onClick={() => cambiarEstado(tarea)} type="button" className="incompleto">incompleto</button>)
                }
            </div>

            <div className="acciones" >
                <button 
                    type="button"
                    className=" btn btn-primario"
                   onClick={()=> seleccionarTarea(tarea)}
                >
                    Editar
                </button>

                <button
                 type="button"
                 className="btn btn-secundario"
                 onClick={() => tareaEliminar(tarea.proyectoId)}
                >
                    Eliminar
                </button>
            </div>
       </li>
     );
}
 
export default Tarea;