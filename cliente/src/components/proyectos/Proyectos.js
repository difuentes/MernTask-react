import React from 'react'
import SideBar from '../layout/Sidebar'
import Barra from '../layout/Barra'
import FormularioTareas from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTareas'

const Proyectos = () => {
    
    return (  
       <div className="contenedor-app">
           <SideBar/>

            <div className="seccion-principal">
                <Barra/>
                <main>
                    <FormularioTareas/>
                    <div className="contenedor-tareas">
                        <ListadoTareas/>
                    </div>
                </main>
            </div>
       </div>
    );
}
 
export default Proyectos;