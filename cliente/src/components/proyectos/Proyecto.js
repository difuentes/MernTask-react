import React,{useContext,Fragment} from 'react'
import ProyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareasContext';

const Proyecto = ({proyecto}) => {

    //obtener el state del proyecto
    const proyectoContext = useContext(ProyectoContext);
    const { proyectoActual } = proyectoContext;

    //obtener funcion context tarea
    const tareasContext = useContext(tareaContext)
    const { obtenerTareas } = tareasContext;

    //funcion para agregar el proyecto actual 
    const seleccionarProyecto = id =>{
        proyectoActual(id);
        obtenerTareas(id);

    }

    return ( 
        <Fragment>
            <li>
                <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
                >
                {proyecto.nombre}
                </button>
            </li>
        </Fragment>
     );
}
 
export default Proyecto;