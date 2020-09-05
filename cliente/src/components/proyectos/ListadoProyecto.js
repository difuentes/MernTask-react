import React,{useContext,useEffect} from 'react'
import Proyecto from './Proyecto'
import ProyectoContext from '../../context/proyectos/proyectoContext'; 
import AlertaContext from '../../context/alertas/alertasContex'; 
//transiciones de diseño 
import {CSSTransition,TransitionGroup} from 'react-transition-group';




const ListadoProyectos = () => {

   
    //extraer proyecto de state inicial
    const proyectoContext = useContext(ProyectoContext);
    const { mensaje,proyectos ,obtenerProyectos} = proyectoContext;

    //extraer proyecto de state inicial
    const alertaContext = useContext(AlertaContext);
    const { alerta,mostrarAlerta} = alertaContext;

    //console.log(proyectos)

    //obtener proyectos cuando carga el componente
    useEffect (()=>{
        //Si hay error
        if(mensaje){
            mostrarAlerta(mensaje.msg,mensaje.categoria);
        }
        obtenerProyectos();
        // eslint-disable-next-line
    },[mensaje])

    //revisar si proyectos tiene contenidos
    if(proyectos.length === 0) return <h2 className="orange">No Hay proyectos , comienza creando uno!</h2>;

   

    return (
        <ul className="listado-proyectos">

        {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>): null }
            <TransitionGroup>
                
                {proyectos.map(proyecto=>(
                    <CSSTransition
                    key={proyecto._id}
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