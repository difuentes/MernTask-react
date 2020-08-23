import React,{useContext,useEffect} from 'react'
import Proyecto from './Proyecto'
import ProyectoContext from '../../context/proyectos/proyectoContext'; 


const ListadoProyectos = () => {

   
    //extraer proyecto de state inicial
    const proyectoContext = useContext(ProyectoContext);
    const { proyectos ,obtenerProyectos} = proyectoContext;

    //obtener proyectos cuando carga el componente
    useEffect (()=>{
        obtenerProyectos();
    },[])

    //revisar si proyectos tiene contenidos
    if(proyectos.length === 0) return null;

   

    return (
        <ul className="listado-proyectos">
            {proyectos.map(proyecto=>(
                <Proyecto
                    key={proyecto.id}
                    proyecto={proyecto}
                />
        ))}
        </ul>
      );
}
 
export default ListadoProyectos;