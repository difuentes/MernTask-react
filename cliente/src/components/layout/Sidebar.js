import React from 'react'
import NuevoProyecto from '../proyectos/NuevaProyecto';
import ListadoProyectos from '../proyectos/ListadoProyecto';

const SideBar = () => {
    return (  
        <aside>
               
                <h1 className="title"><img width="15%" src="icon.png"/> DiFuentes</h1>
            
                <h1 className="orange">MERN <span>Tasks</span></h1>
                <NuevoProyecto/>

                <div className="proyectos">
                    <h2>Tus Proyectos</h2>  
                    <ListadoProyectos/>

                </div>
        </aside>
    );
}
 
export default SideBar;