import React,{useContext,useEffect} from 'react'
import Proyecto from './Proyecto'
import ProyectoContext from '../../context/proyectos/proyectoContext'; 

import {CSSTransition,TransitionGroup} from 'react-transition-group';

const ListadoProyectos = () => {

   
    //extraer proyecto de state inicial
    const proyectoContext = useContext(ProyectoContext);
    const { proyectos ,obtenerProyectos} = proyectoContext;

    

    //obtener proyectos cuando carga el componente
    useEffect (()=>{
        obtenerProyectos();
    },[])

    //revisar si proyectos tiene contenidos
    if(proyectos.length === 0) return <h2 className="orange">No Hay proyectos , comienza creando uno!</h2>;

   

    return (
        <ul className="listado-proyectos">
            <TransitionGroup>
                
                {proyectos.map(proyecto=>(
                    <CSSTransition
                    key={proyecto.id}
                    timeout={200}
                    className="proyecto"
                    >
                         <Proyecto
                           
                            proyecto={proyecto}
                         />
                    </CSSTransition>
                    
                 ))}
            </TransitionGroup>
           
        </ul>
      );
}
 
export default ListadoProyectos;