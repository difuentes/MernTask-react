import React,{Fragment,useContext} from 'react'
import Tarea from '../tareas/Tarea'
import ProyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareasContext';
import {CSSTransition,TransitionGroup} from 'react-transition-group';

const ListadoTareas = () => {

    //obtener el state del Tareas
    const proyectoContext = useContext(ProyectoContext);
    const { proyecto, eliminarProyecto} = proyectoContext;


    //extraer tarea de state 
    const TareaContex = useContext(tareaContext);
    const {tareasProyectos} = TareaContex;

    
    //si no hay proyecto seleccionado
    if(!proyecto) return <h1 className="">Selecciona un Proyecto</h1>

    //array destructuring para extraer el proyecto
    const [proyectoActual] = proyecto;

    return (
        <Fragment>
            <h2 className="orange "> {proyectoActual.nombre} </h2>

            <ul className="listado-tareas">
                {tareasProyectos.length === 0 ? 
                    <li className="tarea">
                        <p>No hay tareas !</p>
                    </li>
                    
                    : <TransitionGroup>
                        {tareasProyectos.map(tarea =>(
                            <CSSTransition
                             key={tarea.proyectoId}
                             timeout={200}
                             className="tarea"
                            >
                                <Tarea
                                    tarea={tarea}
                                />
                            </CSSTransition>
                       
                         ))}
                    </TransitionGroup>
                }
                <button 
                type="button" 
                className="btn btn-secundario"
                onClick={()=>eliminarProyecto(proyectoActual.id)}
                >
                    Eliminar Proyecto
                </button>
            </ul>
            
        </Fragment>
      );
}
 
export default ListadoTareas;