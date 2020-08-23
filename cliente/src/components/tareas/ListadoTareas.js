import React,{Fragment} from 'react'
import Tarea from '../tareas/Tarea'


const ListadoTareas = () => {

    const tareasProyecto = [
        {nombre:'Elegir Plataforma ', estado:true },
        {nombre:'Elegir Pago ', estado:false },
        {nombre:'Elegir Hosting ', estado:true },
    ]

    return (
        <Fragment>
            <h2 className="orange "> OPT1 </h2>

            <ul className="listado-tareas">
                {tareasProyecto.length === 0 ? 
                    <li className="tarea">
                        <p>No hay tareas !</p>
                    </li>
                    
                    : tareasProyecto.map(tarea=>(
                        <Tarea
                            tarea={tarea}
                        />
                    ))
                }
                <button type="button" className="btn btn-secundario">
                    Eliminar Proyecto
                </button>
            </ul>
            
        </Fragment>
      );
}
 
export default ListadoTareas;